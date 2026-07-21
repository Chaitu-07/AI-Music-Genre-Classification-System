from datetime import datetime
from zoneinfo import ZoneInfo
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Prediction(db.Model):
    __tablename__ = "predictions"

    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(
        db.String(255),
        nullable=False
    )

    predicted_genre = db.Column(
        db.String(50),
        nullable=False
    )

    confidence = db.Column(
        db.Float,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(ZoneInfo("Asia/Kolkata"))

    )

    def __repr__(self):

        return f"<Prediction {self.filename}>"