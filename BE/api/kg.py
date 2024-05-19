from flask import Blueprint, jsonify

kg_blueprint = Blueprint("kg", __name__)

@kg_blueprint.route("/", methods = ["GET"])
def generate_kg():

    result = {
        "nodes": [
            {
            "id": "Cloud",
            "isClusterNode": True,
            "label": "city, rental, vancouver",
            "rel_size": 180.0,
            "size": 180,
            "color": "#FFFFFF"
            },
            {
            "cluster_id": "Cloud",
            "id": "fca0451b-5ae4-4da3-a9bb-dcc771750de6",
            "label": "Trend Micro Acquires Cloud Conformity",
            "rank": 0.005440751059506184,
            "degrees": 58
            },
            {
            "cluster_id": "Cloud",
            "id": "c48e0e4e-56c0-4aa0-b8b5-b20f853816ec",
            "label": "Trend Micro Discloses Insider Threat ",
            "rank": 0.004562436119662425,
            "degrees": 55
            }

        ],
        "edges": [
            { "source": "Cloud", "target": "fca0451b-5ae4-4da3-a9bb-dcc771750de6" },
            { "source": "Cloud", "target": "c48e0e4e-56c0-4aa0-b8b5-b20f853816ec" }
        ]
    }
    return jsonify(result)