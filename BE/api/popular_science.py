import os
import ast
import yaml
from flask import Blueprint, jsonify, request
from utils import (
    find_data_from_mongodb,
    find_most_similar_report,
    load_json
)

from data import (
    query_embeddings_from_mongodb, 
    query_content_from_mongodb
)

from LLM_template import claude

with open("config.yaml") as f:
    config = yaml.safe_load(f)
model_id = config["model_id"]
region = config["region"]
popular_science_basic_prompt = config["popular_science_prompt"]["basic"]
popular_science_professional_prompt = config["popular_science_prompt"]["professional"]

popular_science_blueprint = Blueprint("popular_science", __name__)

@popular_science_blueprint.route("/key_words", methods = ["GET", "POST"])
def generate_popular_science_from_key_words():
    
    output_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "invoke-model-output.json")

    # Step0. 輸入資料集、收到關鍵字
    print(request.get_data(as_text = True))
    key_words = ast.literal_eval(request.get_data(as_text = True))["key_words"]
    dataset_from_vector_store = find_data_from_mongodb(
        db_name = "mydatabase",
        collection_name = "vectors"
    )    

    # Step1. 把關鍵字轉換成向量
    # Step2. 用關鍵字的向量找到前五筆最相近的報告資料
    dataset_embedding = query_embeddings_from_mongodb(
        dataset_from_vector_store = dataset_from_vector_store
    )
    dataset_content = query_content_from_mongodb(
        dataset_from_vector_store = dataset_from_vector_store
    )
    hist = find_most_similar_report(
        history = [key_words],
        dataset_embedding = dataset_embedding
    )    
    dataset_content = [
        dataset_content[i["corpus_id"]]
        for i in hist
    ]
    reference_content = "\n------\n".join(dataset_content)

    # Step3. 給定一個主題與科普內容
    # 基礎版
    system_prompt = popular_science_basic_prompt + "\n" + reference_content
    body = claude.messages_template(
        history = [key_words],
        system_reference = system_prompt
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
    basic_text = json_result["content"][0]["text"]
    print(basic_text)

    # 專業版
    system_prompt = popular_science_professional_prompt + "\n" + reference_content
    body = claude.messages_template(
        history = [key_words],
        system_reference = system_prompt
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
    professional_text = json_result["content"][0]["text"]
    print(professional_text)
    result = {
        "basic": basic_text,
        "professional": professional_text
    }
    return jsonify(**result)        

@popular_science_blueprint.route("/latest", methods = ["GET", "POST"])
def generate_popular_science_from_latest():
    return 