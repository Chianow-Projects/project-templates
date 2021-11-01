import flask
from pyasn1.compat import dateandtime
import pymongo
import json
from bson.json_util  import dumps, loads
import datetime
from datetime import timedelta
from flask import request, jsonify
from flask_cors import CORS

from defines import StatisticCommand, DataUnit

DATA_UNIT = DataUnit.getInstance()
client = pymongo.MongoClient("mongodb://localhost:27017/") 
db = client["chianow"] 
accounts = db["accounts"]
forks = db["chiaforks"]
wallets = db["wallets"]
activities = db["loginactivitys"]
transactions = db["transactionnows"]


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
    accID = request.args.get('id')
    userforks = wallets.find({'accID': accID})
    resp = []
    resp.append({'key': accID})
    resp[0]['uwallets'] = list(userforks)
    # resp.append({'uwallets': list(userforks)})
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
    startPoint = dateandtime.datetime(now.year, now.month, now.day, 0, 0, 0)
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