from typing import List

def messages_template(
    history: List[str],
    anthropic_version: str = "bedrock-2023-05-31",
    system_reference: str = None
):
    
    messages = [
        {
            "role": "user" if index % 2 == 0 else "assistant",
            "content": [{
                "type": "text",
                "text": one_text
            }]
        }
        for index, one_text in enumerate(history)
    ]

    body = {
        "messages": messages,
        "anthropic_version": anthropic_version,
        "max_tokens": 4096,
    }

    # 加入參考資料
    if system_reference:
        body = {
            **body,
            "system": system_reference
        }


    body = str(body).replace("'", r'\"')
    body = '--body "' + body + '"'
    return body