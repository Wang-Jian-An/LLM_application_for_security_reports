from flask import Blueprint, jsonify

abstract_blueprint = Blueprint("abstract", __name__)

@abstract_blueprint.route("/input_keywords", methods = ["GET", "POST"])
def 