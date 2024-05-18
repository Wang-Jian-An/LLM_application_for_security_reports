from flask import Flask

from api import chatbot_blueprint

app = Flask(__name__)
app.register_blueprint(chatbot_blueprint, url_prefix = "/chatbot")

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5000)