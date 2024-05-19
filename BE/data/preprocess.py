

def query_embeddings_from_mongodb(
    dataset_from_vector_store
):
    dataset_embedding = [
        j["embedding"]
        for i in dataset_from_vector_store
        for key, j in i.items()
        if not(key == "_id")
    ]
    return dataset_embedding

def query_content_from_mongodb(
    dataset_from_vector_store
):
    dataset_content = [
        j["content"]
        for i in dataset_from_vector_store
        for key, j in i.items()
        if not(key == "_id")
    ]    
    return dataset_content