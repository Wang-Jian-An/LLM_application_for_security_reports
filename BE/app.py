from flask import Flask
from flask_cors import CORS

from api import (
    chatbot_blueprint,
    popular_science_blueprint,
    kg_blueprint
)

app = Flask(__name__)
app.register_blueprint(chatbot_blueprint, url_prefix = "/chatbot")
app.register_blueprint(popular_science_blueprint, url_prefix = "/popular_science")
app.register_blueprint(kg_blueprint, url_prefix = "/kg")
CORS(app)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5005)