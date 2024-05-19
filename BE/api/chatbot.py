import os
import ast
from flask import Blueprint, jsonify, request
from typing import List

from LLM_template import claude
from utils import (
    load_json, 
    find_data_from_mongodb, 
    find_most_similar_report
)
from data import (
    query_embeddings_from_mongodb, 
    query_content_from_mongodb
)

import yaml

with open("config.yaml") as f:
    config = yaml.safe_load(f)
model_id = config["model_id"]
region = config["region"]

chatbot_blueprint = Blueprint("chatbot", __name__)

@chatbot_blueprint.route("/", methods = ["GET", "POST"])
def response():
    
    """
    將過去使用者的對話內容以及 LLM 回傳的歷史內容一起給予 LLM。
    """

    print(request.get_data(as_text = True))
    history = ast.literal_eval(request.get_data(as_text = True))["history"]
    output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "invoke-model-output.json")

    # 把資料從 mongodb 拿出來
    dataset_from_vector_store = find_data_from_mongodb(
        db_name = "mydatabase",
        collection_name = "vectors"
    )
    # dataset_embedding = [
    #     j["embedding"]
    #     for i in dataset_from_vector_store
    #     for key, j in i.items()
    #     if not(key == "_id")
    # ]
    # dataset_content = [
    #     j["content"]
    #     for i in dataset_from_vector_store
    #     for key, j in i.items()
    #     if not(key == "_id")
    # ]    
    dataset_embedding = query_embeddings_from_mongodb(
        dataset_from_vector_store = dataset_from_vector_store
    )
    dataset_content = query_content_from_mongodb(
        dataset_from_vector_store = dataset_from_vector_store
    )
    hist = find_most_similar_report(
        history = history,
        dataset_embedding = dataset_embedding
    )

    dataset_content = [
        dataset_content[i["corpus_id"]]
        for i in hist
    ]
    reference_content = "\n\n".join(dataset_content)

    body = claude.messages_template(
        history = history
    )

    cmd = "aws bedrock-runtime invoke-model {} {} {} {} {}".format(
        model_id,
        body,
        region,
        "--cli-binary-format raw-in-base64-out", 
        output_file
    )
    os.system(cmd)

    json_result = load_json(
        folder_path = os.path.dirname(os.path.abspath(__file__)),
        file_name = "invoke-model-output.json"
    )

    return jsonify({'response': json_result["content"][0]["text"]})