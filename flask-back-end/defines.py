from enum import Enum

from werkzeug.sansio.multipart import Data


class StatisticCommand(Enum):
    LISTED_USER_ONLINE                  = int(1)
    LISTED_USER_CREATED                 = 2
    LISTED_USER_INTERATED_FREQUENTLY    = 3
    LISTED_USER_UNINTERATED_ALONGTIME   = 4
    LISTED_USER_RECHARGE                = 5
    LISTED_USER_TRANSACTION             = 6

class GetUserInfoType(Enum):
    GET_USER_INFOR_BY_ONLY_ID        = 1
    GET_USER_INFOR_BY_ONLY_NAME      = 2



class DataUnit():
    __instance = None
    __totalUser = 0
    __activeUser = 0
    __apiRes = {
        "total": 0,
        "active": 0
    }
    @staticmethod
    def getInstance():
        if DataUnit.__instance == None:
            DataUnit()
        return DataUnit.__instance

    def __init__(self):
        print("Contructor!!!!!!!")
        """ Virtually private constructor. """
        if DataUnit.__instance != None:
            raise Exception("It's not a skeleton!")
        else:
            DataUnit.__instance = self

    def reply(self):
        print('total: ' + str(self.__totalUser))
        print('active: ' + str(self.__activeUser))
        self.__apiRes['total'] = self.__totalUser
        self.__apiRes['active'] = self.__activeUser
        return self.__apiRes


