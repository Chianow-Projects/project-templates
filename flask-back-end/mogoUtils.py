from typing import List
import pymongo
import datetime
from datetime import timedelta
from bson.json_util  import dumps, loads

client = pymongo.MongoClient("mongodb://localhost:27017/") 
db = client["chianow"] 
accounts = db["accounts"]
forks = db["chiaforks"]
wallets = db["wallets"]
activities = db["loginactivitys"]
transactions = db["transactionnows"]


if __name__ == "__main__":
    start = datetime.datetime(2021, 9, 14, 0, 0, 0, 0)
    end = datetime.datetime(2021, 9, 14, 23, 59, 0, 0)
    print(start)
    print(end)
    # day_loginCount = accounts.count_documents({"timeStamp" : {'$gte': start, '$lt': start + timedelta(hours=24)}})

    em = accounts.find({ '$and' :[{'$where':"this.lastLogin >= this.lastDateActive"}, {"timeStamp" : {'$gte': start, '$lt': start + timedelta(hours=24)}}]}).count()
    print(em)
    # print(dumps(accounts.find_one({'dailyCount': {'$eq' : 2 }})))
    # print(dumps(day_loginCount))

    bm = activities.find().limit(20)
    print(dumps(bm))


    