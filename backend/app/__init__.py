from flask import Flask

from config import *

def create_app():

    app = Flask(__name__)

    app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
    app.config["SECRET_KEY"] = SECRET_KEY
    app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH

    from app.routes import main

    app.register_blueprint(main)

    return app