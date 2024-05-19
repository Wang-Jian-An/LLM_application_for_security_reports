from typing import List, Dict 
from pymongo import MongoClient

def conn_mongo(func):
    def deco(*args, **kwargs):
        
        with MongoClient("mongodb://localhost:27017/") as client:
            db = client["mydatabase"]
            collection = db["vectors"]
            func(collection = collection, *args, **kwargs)
            return
    return deco

@conn_mongo
def insert_to_mongodb(
    collection, 
    vectors: List[Dict[str, List[float]]]
) -> None:
    
    """
    把向量儲存至 Mondb 中
    """

    collection.insert_many(vectors)
    return 

def find_data_from_mongodb() -> List[Dict[str, str]]:

    with MongoClient("mongodb://localhost:27017/") as client:
        db = client["mydatabase"]
        collection = db["vectors"] 
        df = [i for i in collection.find()]
        return df