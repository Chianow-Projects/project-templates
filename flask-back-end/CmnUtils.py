

### Linked List ###
class Node:
    def __init__(self, forkID, type, order, amount, forward, fee=None, gas=None):
        self.next    = None
        self.forkID  = forkID
        self.type    = type
        self.amount  = amount
        self.forward = forward
        self.fee     = fee
        self.gas     = gas
        self.order   = order


class LinkedList:
    def __init__(self):
        self.head = None


    def printAll(self):
        element = self.head
        while element is not None:
            print(element.forkID)
            element = element.next
    
    def addNode(self, node):
        if type(node) is not Node:
            '''Input is not Node'''
            return
        if self.head is None:
            self.head = node
            return
        last = self.head
        while(last.next):
            last = last.next
        last.next = node


    def deleteNode(self, removeData):
        if len(removeData) != 2:
            '''Input is not correct'''
            return
        _fork = removeData[0]
        _order = removeData[1]

        prev = None
        element = self.head
        if (element is not None):
            if (element.forkID == _fork) and (element.order == _order):
                self.head = element.next
                element = None
                return
        while (element is not None):
            if (element.forkID == _fork) and (element.order == _order):
                break
            prev = element
            element = element.next

        if (element is None):
            print('Remove Data cant be found')
            return

        prev.next = element.next
        element = None

    def getTotalLockedBalance(self):
        count = 0
        element = self.head
        while element is not None:
            count = count + element.amount
            element = element.next
        return count
### Linked List ###


### Singleton Class ###

class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class Singleton(metaclass=SingletonMeta):

    def __init__(self, mongoDB) -> None:
        print('Initial Singleton ')
        self.accounts      = mongoDB["accounts"]
        self.forks         = mongoDB["chiaforks"]
        self.wallets       = mongoDB["wallets"]
        self.transactions  = mongoDB["loginactivitys"]
        self.activities    = mongoDB["transactionnows"]


