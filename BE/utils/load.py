import os
import json
import pandas as pd

def load_json(
    folder_path: str,
    file_name: str
) -> dict:
    
    """
    讀取 JSON 檔案
    """

    with open(os.path.join(folder_path, file_name)) as f:
        result_dict = json.load(f)
    return result_dict

def load_table(
    folder_path: str,
    file_name: str
) -> pd.DataFrame:
    
    if ".xlsx" == file_name[-5:]:
        df = pd.read_excel(os.path.join(folder_path, file_name))

    return df