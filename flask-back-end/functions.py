from types import prepare_class
from CmnUtils import Node, LinkedList
from CmnUtils import Singleton

def getLockedBalance(input):
    _tmpList = LinkedList()
    _transactionHistory = list(input)
    for item in _transactionHistory:
        if item['type'] == "LOCK":
            '''Create node'''
            _order = -1
            _strs = str(item['memo']).split()
            for subString in _strs:
                if (subString.find('#') != -1):
                    _order = int(subString[1:-1])
                    print('Found new node has fork: ' + str(item['forkId']) + ' and order: ' + str(_order) )
            newNode = Node(item['forkId'], item['type'], _order, item['amount'], item['forwardBalance'])
            _tmpList.addNode(newNode)

        elif item['type'] == "UNLOCK":
            '''Create remove data'''
            _order = -1
            _strs = str(item['memo']).split()
            for subString in _strs:
                if (subString.find('#') != -1):
                    _order = int(subString.lstrip('#').rstrip(','))
                    print('Found new remove has fork: ' + str(item['forkId']) + ' and order: ' + str(_order) )
            _removeData = list()
            _removeData.append(item['forkId'])
            _removeData.append(_order)
            _tmpList.deleteNode(_removeData)

        else:
            print('Item type is not correct')
            return -1
    
    return _tmpList.getTotalLockedBalance()
    # return 0


def getUserBalanceInformation(input):
    _transactionHistory = list(input)

    if len(_transactionHistory) == 0:
        print('[User Balance Info: Input is empty!')
        return [0, 0, 0]
    '''Get Balance from forwardBalance at the lastest document'''
    _balance = float(_transactionHistory[-1]['forwardBalance'])
    _sumLock = float(0)
    _sumUnlock = float(0)

    for item in _transactionHistory:
        if item['type'] == "LOCK":
            _sumLock = _sumLock + item['amount']
        elif item['type'] == "UNLOCK":
            _sumUnlock = _sumUnlock + item['amount'] 
        else:
            print('Item type is not correct')
            return -1
    
    _lockedBalance = _sumLock - _sumUnlock
    _total = _balance + abs(_lockedBalance)
    print('[User Balance Info: {0}, {1}, {2}'.format(_balance, _lockedBalance, _total))
    return [_balance, _lockedBalance, _total]


def getBalanceInformation(accID, option=0):
    DB = Singleton(None)
    count = 0
    #
    count_balance = 0
    count_lock = 0
    #
    resp = []
    resp.append({'key': accID})
    '''1.Get list fork of this users'''
    
    userHasForks = list(DB.wallets.find({'accID' : accID}))

    if accID == 'cnow13c9zjct4kt81rj26goo':
        print(userHasForks)

    if userHasForks is None:
        print("[getBalanceInformation] user {0} has no information !".format(accID))
        return []    
    for doc in userHasForks:
        '''Remove unused key'''
        if doc.__contains__('_id'):
            del doc['_id']
        if doc.__contains__('__v'):
            del doc['__v']
        if doc.__contains__('timeStamp'):
            del doc['timeStamp']
        if doc.__contains__('accID'):
            del doc['accID']
        '''1. Get forkID for quering and rateMojo for calculating'''
        _forkID = doc['forkId']
        _rateMojo = float(DB.forks.find_one({'forkId' : { '$eq' : _forkID}})['rateMojo'])
        '''2. Get balance from the 'forwardBalance' field at the lastest document'''
        _allTypeTransaction = list(DB.transactions.find({'accID': accID, 'forkId': _forkID}).sort([('timestamp', -1)]))

        if len(_allTypeTransaction) == 0:
            print(accID)
            _balance = 0
        else:
            print(_allTypeTransaction)
            _balance = float(_allTypeTransaction[0]['forwardBalance'])*_rateMojo
        '''3. Get locked Balance from transactionows table by get sum(LOCK) and sum(UNLOCK)'''
        _lockTypeTransaction = DB.transactions.find({'accID': accID, 'forkId': _forkID, '$or': [{ 'type': { '$eq': 'LOCK' }},{ 'type': { '$eq': 'UNLOCK' }}]})
        if _lockTypeTransaction.count() == 0:
            _lockbalance = 0
        else:
            _sumLock = float(0)
            _sumUnlock = float(0)
            for doc in _lockTypeTransaction:
                if doc['type'] == "LOCK":
                    _sumLock = _sumLock + doc['amount']
                elif doc['type'] == "UNLOCK":
                    _sumUnlock = _sumUnlock + doc['amount'] 
                else:
                    print('Item type is not correct')
            _lockbalance = float((_sumLock - _sumUnlock)*_rateMojo)
        '''4. Get total balance '''
        _total = _balance + abs(_lockbalance)
        doc['balanceReal'] = _balance
        doc['balanceLocked'] = _lockbalance
        doc['totalBalance'] = _total
        doc['forkSymbol'] = DB.forks.find_one({'forkId' : { '$eq' : doc['forkId']}})['symbol']
        doc['key'] = count + 1
        count = count + 1
        #
        count_balance = count_balance + _balance
        count_lock = count_lock + _lockbalance
        #
    resp[0]['uwallets'] = userHasForks

    if option == 0:
        return resp
    elif option == 1:
        if accID == 'cnow13c9zjct4kt81rj26goo':
            print(count_balance)
            print(count_lock)
        return [count_balance, count_lock]
    else:
        return resp



def getTotalBalanceOfSytemType1():
    DB = Singleton(None)
    COUNT_BALANCE = 0
    COUNT_LOCK_BALANCE = 0
    TOTAL = 0
    '''1.Get list of all user'''
    _totalUsers = []
    for user in DB.accounts.find():
        _totalUsers.append(user['accID'])
    print("[getTotalBalanceOfSytemType1] _totalUsers: " + str(len(_totalUsers)))
    '''2.Get infor of each user'''
    for id in _totalUsers:
        _tmp = getBalanceInformation(id, 1)
        COUNT_BALANCE = COUNT_BALANCE + _tmp[0]
        COUNT_LOCK_BALANCE = COUNT_LOCK_BALANCE + _tmp[1]
    
    TOTAL = COUNT_BALANCE + abs(COUNT_LOCK_BALANCE)

    return [COUNT_BALANCE, COUNT_LOCK_BALANCE, TOTAL]


