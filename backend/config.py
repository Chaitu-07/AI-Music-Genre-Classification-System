import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "app",
    "uploads"
)

ALLOWED_EXTENSIONS = {
    "au",
    "wav"
}

SECRET_KEY = "music_genre_classifier"

MAX_CONTENT_LENGTH = 20 * 1024 * 1024