import torch
import requests
import itertools
from typing import List
from sentence_transformers.util import semantic_search

def find_most_similar_report(
    history: List[str],
    dataset_embedding,
    search_num: int = 1
):
    
    model_id = "sentence-transformers/gtr-t5-base"
    hf_token = "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"    
    huggingface_api_url = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{model_id}"
    headers = {"Authorization": f"Bearer {hf_token}"}    
    user_input_embedding = requests.post(
        huggingface_api_url, 
        headers=headers, 
        json={"inputs": history, "options":{"wait_for_model":True}}
    )
    user_input_embedding = torch.FloatTensor(user_input_embedding.json()).mean(dim = 0)
    dataset_embedding = torch.FloatTensor(dataset_embedding)
    hits = semantic_search(user_input_embedding, dataset_embedding, top_k = search_num)[0]
    return hits