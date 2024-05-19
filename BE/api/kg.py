import os
import json
from flask import Blueprint, jsonify
from utils import find_data_from_mongodb

kg_blueprint = Blueprint("kg", __name__)

@kg_blueprint.route("/", methods = ["GET"])
def generate_kg():

    # 從 MongoDB 中抓出 Node
    node_list = find_data_from_mongodb(
        db_name = "mydatabase",
        collection_name = "kg_node"
    )
    node_list = [
        {
            key: value
            for key, value in one_node.items()
            if not(key == "_id")            
        }
        for one_node in node_list

    ]

    # 從 MongoDB 中抓出 Edge
    edge_list = find_data_from_mongodb(
        db_name = "mydatabase",
        collection_name = "kg_edge"
    )
    edge_list = [
        {
            key: value
            for key, value in one_edge.items()
            if not(key == "_id")            
        }
        for one_edge in edge_list
        
    ]    

    print("開始抓取知識圖譜")
    # result = {
    #     "nodes": [
    #         {
    #         "id": "Cloud",
    #         "isClusterNode": True,
    #         "label": "city, rental, vancouver",
    #         "rel_size": 180.0,
    #         "size": 180,
    #         "color": "#FFFFFF"
    #         },
    #         {
    #         "cluster_id": "Cloud",
    #         "id": "fca0451b-5ae4-4da3-a9bb-dcc771750de6",
    #         "label": "Trend Micro Acquires Cloud Conformity",
    #         "rank": 0.005440751059506184,
    #         "degrees": 58
    #         },
    #         {
    #         "cluster_id": "Cloud",
    #         "id": "c48e0e4e-56c0-4aa0-b8b5-b20f853816ec",
    #         "label": "Trend Micro Discloses Insider Threat ",
    #         "rank": 0.004562436119662425,
    #         "degrees": 55
    #         }

    #     ],
    #     "edges": [
    #         { "source": "Cloud", "target": "fca0451b-5ae4-4da3-a9bb-dcc771750de6" },
    #         { "source": "Cloud", "target": "c48e0e4e-56c0-4aa0-b8b5-b20f853816ec" }
    #     ]
    # }
    result = {
        "node": node_list,
        "edge": edge_list
    }
    result = json.dumps(result, indent = 4)

    with open(os.path.join(os.path.dirname(__file__), "../../FE/src/example", "example1.json"), "w") as f:
        f.write(result)
    # return jsonify(node = node_list, edge = edge_list)
    # return jsonify(result)
    return "Ok"