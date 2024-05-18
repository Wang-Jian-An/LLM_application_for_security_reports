import os
import ast
from flask import Blueprint, jsonify, request
from typing import List

from LLM_template import claude
from utils import load_json

chatbot_blueprint = Blueprint("chatbot", __name__)

@chatbot_blueprint.route("/", methods = ["GET", "POST"])
def response():
    
    """
    將過去使用者的對話內容以及 LLM 回傳的歷史內容一起給予 LLM。
    """

    history = ast.literal_eval(request.get_data(as_text = True))["history"]
    model_id = "--model-id " + "anthropic.claude-3-opus-20240229-v1:0"
    region = "--region " + "us-west-2"
    output_file = "invoke-model-output.json"
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
        file_path = "./",
        file_name = "invoke-model-output.json"
    )

    return jsonify({'response': json_result["content"][0]["text"]})