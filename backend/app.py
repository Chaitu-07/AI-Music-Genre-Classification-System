from flask import Flask
from config import *

from app.routes import main
from app.database import init_database

app = Flask(
    __name__,
    template_folder="app/templates",
    static_folder="app/static"
)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["ALLOWED_EXTENSIONS"] = ALLOWED_EXTENSIONS
app.config["SECRET_KEY"] = SECRET_KEY
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH

app.register_blueprint(main)

init_database(app)

if __name__ == "__main__":
    app.run(debug=True)