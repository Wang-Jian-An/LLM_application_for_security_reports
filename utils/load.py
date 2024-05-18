import os
import json

def load_json(
    file_path: str,
    file_name: str
) -> dict:
    
    """
    讀取 JSON 檔案
    """

    with open(os.path.join(file_path, file_name)) as f:
        result_dict = json.load(f)
    return result_dict