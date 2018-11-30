from flask import Flask
from flask import request
from flask_cors import CORS
from .controller import controller


def register_controllers_routes(app):
    app.register_blueprint(controller.routes)


def create_app():
    app = Flask(__name__)
    CORS(app)
    register_controllers_routes(app)
    return app