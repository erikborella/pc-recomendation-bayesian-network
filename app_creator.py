from flask import Flask

from features.computerRecommendation import ComputerRecommendation

def create_app():
    app = Flask(__name__, static_folder='static')
    app.config.from_pyfile('config.py')

    register_blueprints(app)

    return app

def register_blueprints(app: Flask):
    app.register_blueprint(ComputerRecommendation, url_prefix='/recommendation')