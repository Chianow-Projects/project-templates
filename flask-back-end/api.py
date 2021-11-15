from typing import ItemsView
import flask
import pymongo
import json
from bson.json_util  import dumps, loads
import datetime
from datetime import timedelta
from flask import request, jsonify
from flask_cors import CORS
from pymongo.message import _EMPTY

from defines import StatisticCommand, GetUserInfoType, DataUnit
from CmnUtils import Singleton
from functions import getLockedBalance, getUserBalanceInformation, getBalanceInformation, getTotalBalanceOfSytemType1


client = pymongo.MongoClient("mongodb://localhost:27017/") 
db = client["chianow"] 
accounts = db["accounts"]
forks = db["chiaforks"]
wallets = db["wallets"]
activities = db["loginactivitys"]
transactions = db["transactionnows"]

DATA_UNIT = Singleton(db)


app = flask.Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# CORS(app)
app.config["DEBUG"] = True

################################################################################################################################
@app.route('/api/test/forks', methods=['GET'])
def getForksData():
    return dumps(list(forks.find()))

@app.route('/api/test/userdatas', methods=['GET'])
def getUsersData():
    cursor = accounts.find()
    list_cursor = list(cursor)
    count = 0
    for ele in list_cursor:
        count+=1
        ele['key'] = count
    return dumps(list_cursor)


@app.route('/api/test/userinfo', methods=['GET'])
def getUserInfo():
    count = 0
    cmd = int(request.args.get('cmd'))
    history = bool(request.args.get('history'))
    userforks = None
    transactionhistory = None
    
    resp = []

    # switching cmd
    if cmd == GetUserInfoType.GET_USER_INFOR_BY_ONLY_ID._value_:
        accID = request.args.get('value')
        userforks = wallets.find({'accID': accID})
        transactionhistory = transactions.find({'accID': accID}).sort([('timeStamp', -1)])
    elif cmd == GetUserInfoType.GET_USER_INFOR_BY_ONLY_NAME._value_:
        accName = request.args.get('value')
        accID = accounts.find_one({'accName' : accName})['accID']
        userforks = wallets.find({'accID': accID})
        transactionhistory = transactions.find({'accID': accID}).sort([('timeStamp', -1)])
    elif cmd == GetUserInfoType.GET_ALL_OF_THEM._value_:
        ''' Get all '''
        _tmp = getTotalBalanceOfSytemType1()
        resp.append({'key': 'all'})
        resp[0]['uwallets'] = [{'balanceReal' : _tmp[0], 'balanceLocked' : _tmp[1], 'totalBalance': _tmp[2], 'forkSymbol':'ALL', 'key': 1}]
        return dumps(resp)

    else:
        
        print("The wrong command!")

    
    resp.append({'key': accID})
    # resp[0]['uwallets'] = list(userforks)
    # resp[0]['uhistory'] = list(transactionhistory)

    if userforks is None or transactionhistory is None == 0:
        return flask.abort(404)

    tmp_userforks = list(userforks)
    for item in tmp_userforks:
        '''Remove unused key'''
        if item.__contains__('_id'):
            del item['_id']
        if item.__contains__('__v'):
            del item['__v']

        '''Count Balance'''
        _fork = item.get('forkId')
        if _fork is None:
            return flask.abort(501, "ForkID cant be found!")
        _rateMojo = float(forks.find_one({'forkId' : { '$eq' : _fork}})['rateMojo'])

        '''Forward balance got from the lastest document is the balance value'''
        _transactionHistory = transactions.find({'accID': accID, 'forkId': _fork})
        _transactionList = list(_transactionHistory)
        if len(_transactionList) == 0:
            item['balanceReal']  = 0
        else:
            item['balanceReal'] = (_transactionList)[-1]['forwardBalance']*_rateMojo 
        '''Locked balance got by sum(LOCK) - sum(UNLOCK)'''
        _transactionHistory = transactions.find({'accID': accID, 'forkId': _fork, '$or': [{ 'type': { '$eq': 'LOCK' }},{ 'type': { '$eq': 'UNLOCK' }}]})                                                                     
        _balanceInfoFromTransactionHistory = getUserBalanceInformation(_transactionHistory)
        item['balanceLocked'] = float(_balanceInfoFromTransactionHistory[1])*_rateMojo
        '''Total balance got by Balance + |Locked Balance|'''
        item['totalBalance'] = item['balanceReal'] + abs(item['balanceLocked'])

        '''Fork descriptions'''
        item['forkSymbol'] = forks.find_one({'forkId' : { '$eq' : item['forkId']}})['symbol']

        '''Unique value'''
        item['key'] = count + 1
        count = count + 1
    resp[0]['uwallets'] = tmp_userforks

    if history:
        count = 0
        tmp_transactionhistory = list(transactionhistory)
        for item in tmp_transactionhistory:
            '''Remove unused key'''
            if item.__contains__('_id'):
                del item['_id']
            if item.__contains__('__v'):
                del item['__v']

            '''Unique value'''
            item['key'] = count + 1
            count = count + 1

        
        resp[0]['uhistory'] = tmp_transactionhistory
    else:
        resp[0]['uhistory'] = list()
    return dumps(resp)

@app.route('/api/test/shortchart')
def getShortChartData():
    resp = []
    for n in range(7):
        start = datetime.datetime(1970, 9, 14, 0, 0, 0, 0)
        time = datetime.datetime(2021, 9, 14, 23, 59, 0, 0) - timedelta(hours=n*24)
        resp.append({'timestamp': time.isoformat()})
        resp[n]['totalUser'] = accounts.count_documents({"timeStamp" : {'$gte': start, '$lt': time}})
        resp[n]['loginCount'] = accounts.count_documents({"lastLogin" : {'$gte': time - timedelta(hours=12) , '$lt': time + timedelta(hours=12)}})
        resp[n]['activeCount'] = accounts.find({ '$and' : [{'$where':"this.lastLogin >= this.lastDateActive"}, {"timeStamp" : {'$gte': start, '$lt': time}}]}).count()
    return(dumps(resp[::-1]))

@app.route('/api/test/overviewinfo')
def getOverviewInfo():
    resp = []
    for n in range(24):
        start = datetime.datetime(1970, 9, 14, 0, 0, 0, 0)
        time = datetime.datetime(2021, 9, 14, 23, 59, 0, 0) - timedelta(hours=n)
        resp.append({'timestamp': time.strftime("%I:%M %p")})
        #resp[n]['totalUser'] = accounts.count_documents({"timeStamp" : {'$gte': start, '$lt': time}})
        resp[n]['loginCount'] = accounts.count_documents({"lastLogin" : {'$gte': time - timedelta(minutes=30) , '$lt': time + timedelta(minutes=30)}})
        resp[n]['activeCount'] = accounts.find({ '$and' : [{'$where':"this.lastLogin >= this.lastDateActive"}, {"timeStamp" : {'$gte': start, '$lt': time}}]}).count()
    return(dumps(resp[::-1]))

@app.route('/api/test/statistic', methods=['GET'])
def getStatisticReport():
    cmd = int(request.args.get('cmd'))
    startTime = datetime.datetime.fromtimestamp(float(request.args.get('start')))
    endTime = datetime.datetime.fromtimestamp(float(request.args.get('end')))
    print(cmd)
    print(startTime)
    print(endTime)
    resp = []
    if cmd is StatisticCommand.LISTED_USER_ONLINE._value_:
        print("StatisticCommand.LISTED_USER_ONLINE")
        resp = activities.find({"state" : {'$eq': "login"}})
    elif cmd is StatisticCommand.LISTED_USER_CREATED._value_:
        print("StatisticCommand.LISTED_USER_CREATED")
        resp = accounts.find({"timeStamp" : {'$gte': startTime, '$lt': endTime}})
    elif cmd is StatisticCommand.LISTED_USER_INTERATED_FREQUENTLY._value_:
        print("StatisticCommand.LISTED_USER_INTERATED_FREQUENTLY")
    elif cmd is StatisticCommand.LISTED_USER_UNINTERATED_ALONGTIME._value_:
        print("StatisticCommand.LISTED_USER_UNINTERATED_ALONGTIME")
    elif cmd is StatisticCommand.LISTED_USER_RECHARGE._value_:
        print("StatisticCommand.LISTED_USER_RECHARGE")
    elif cmd is StatisticCommand.LISTED_USER_TRANSACTION._value_:
        print("StatisticCommand.LISTED_USER_TRANSACTION")
        resp = transactions.find({"timeStamp" : {'$gte': startTime, '$lt': endTime}})

    else:
        print("Type not right!")
    return dumps(resp)


@app.route('/api/test/autoupdates', methods=['GET'])
def autoUpdates():
    cout = 0
    resp = {}
    """----------"""
    resp['total'] = accounts.count_documents({})
    """----------"""
    resp['active'] = accounts.count_documents({'accStatus' : {'$eq': "ONLINE"}})
    """----------"""
    resp['interactive'] = accounts.count_documents({'dailyCount' : {'$gte' : 2}})
    """----------"""
    resp['noninteractive'] = accounts.count_documents({'dailyCount' : {'$eq' : 0}})
    """----------"""
    now = datetime.datetime.now()
    startPoint = datetime.datetime(now.year, now.month, now.day, 0, 0, 0)
    resp['newcomers'] = accounts.count_documents({'timeStamp' : {'$gte' : startPoint}})
    """----------"""
    resp['logAct'] = list(activities.find().sort([('timestamp', -1)]).limit(10))
    for item in resp['logAct']:
        item['key'] = cout+1
        item['accName'] = accounts.find_one({'accID' : { '$eq' : str(item['accID'])}}).get("accName")
        cout+=1
    """----------"""
    tmp = []
    resp['totalUserChart'] = []
    for item in range(24):
        tmp.append(accounts.count_documents(
            {"timeStamp" : 
                {'$gte': datetime.datetime(1970, 9, 14, 0, 0, 0, 0), '$lt': datetime.datetime.now() - timedelta(hours=item*24*2)}
            }
        ))
    resp['totalUserChart'] = tmp[::-1]
    """----------"""
    
    return dumps(resp)

################################################################################################################################
app.run(host="0.0.0.0", port=5000)