import os
import csv
from io import StringIO

from flask import (
    Blueprint,
    Response,
    render_template,
    request,
    current_app,
    flash,
    redirect,
    url_for
)

from werkzeug.utils import secure_filename

from app.predictor import predict_genre
from app.models import db, Prediction


main = Blueprint("main", __name__)


# =====================================================
# Allowed File Check
# =====================================================

def allowed_file(filename):

    return (

        "." in filename

        and

        filename.rsplit(".", 1)[1].lower()

        in current_app.config["ALLOWED_EXTENSIONS"]

    )


# =====================================================
# Home Page
# =====================================================

@main.route("/")
def index():

    return render_template("index.html")


# =====================================================
# Prediction
# =====================================================

@main.route("/predict", methods=["POST"])
def predict():

    if "audio" not in request.files:

        flash("No file uploaded.", "danger")
        return render_template("index.html")


    file = request.files["audio"]


    if file.filename == "":

        flash("Please choose an audio file.", "warning")
        return render_template("index.html")


    if not allowed_file(file.filename):

        flash("Only .au and .wav files are allowed.", "danger")
        return render_template("index.html")


    filename = secure_filename(file.filename)

    upload_folder = current_app.config["UPLOAD_FOLDER"]

    os.makedirs(upload_folder, exist_ok=True)

    upload_path = os.path.join(

        upload_folder,

        filename

    )

    try:

        file.save(upload_path)

        # ----------------------------------------
        # AI Prediction
        # ----------------------------------------

        result = predict_genre(upload_path)

        genre = result["genre"]

        confidence = result["confidence"]

        top_predictions = result["top_predictions"]


        # ----------------------------------------
        # Save Prediction
        # ----------------------------------------

        prediction = Prediction(

            filename=filename,

            predicted_genre=genre,

            confidence=float(confidence)

        )

        db.session.add(prediction)

        db.session.commit()


        return render_template(

            "result.html",

            genre=genre,

            confidence=confidence,

            top_predictions=top_predictions

        )


    except Exception as e:

        db.session.rollback()

        flash(f"Prediction Error: {e}", "danger")

        return render_template("index.html")


    finally:

        if os.path.exists(upload_path):

            os.remove(upload_path)


# =====================================================
# Prediction History
# =====================================================

@main.route("/history")
def history():

    # Statistics
    all_predictions = Prediction.query.all()

    total_predictions = len(all_predictions)

    average_confidence = (
        sum(p.confidence for p in all_predictions) / total_predictions
        if total_predictions else 0
    )

    # Pagination
    page = request.args.get("page", 1, type=int)

    predictions = (
        Prediction.query
        .order_by(Prediction.created_at.desc())
        .paginate(
            page=page,
            per_page=12,
            error_out=False
        )
    )

    return render_template(
        "history.html",
        predictions=predictions,
        total_predictions=total_predictions,
        average_confidence=average_confidence
    )

# =====================================================
# Prediction Details
# =====================================================

@main.route("/prediction/<int:id>")
def prediction_details(id):

    prediction = Prediction.query.get_or_404(id)

    return render_template(

        "prediction_details.html",

        prediction=prediction

    )


# =====================================================
# Delete Prediction
# =====================================================

@main.route("/delete_prediction/<int:id>", methods=["POST"])
def delete_prediction(id):

    prediction = Prediction.query.get_or_404(id)

    try:

        db.session.delete(prediction)

        db.session.commit()

        flash(

            "Prediction deleted successfully.",

            "success"

        )

    except Exception as e:

        db.session.rollback()

        flash(

            f"Error deleting prediction: {e}",

            "danger"

        )

    return redirect(

        url_for("main.history")

    )


# =====================================================
# Clear History
# =====================================================

@main.route("/clear_history", methods=["POST"])
def clear_history():

    try:

        Prediction.query.delete()

        db.session.commit()

        flash(

            "Prediction history cleared.",

            "success"

        )

    except Exception as e:

        db.session.rollback()

        flash(

            f"Error clearing history: {e}",

            "danger"

        )

    return redirect(

        url_for("main.history")

    )


# =====================================================
# Export CSV
# =====================================================

@main.route("/export")
def export_csv():

    predictions = Prediction.query.order_by(

        Prediction.created_at.desc()

    ).all()

    output = StringIO()

    writer = csv.writer(output)

    writer.writerow(

        [

            "Filename",

            "Genre",

            "Confidence (%)",

            "Prediction Date"

        ]

    )

    for p in predictions:

        writer.writerow(

            [

                p.filename,

                p.predicted_genre,

                f"{p.confidence:.2f}",

                p.created_at.strftime(

                    "%d-%m-%Y %H:%M:%S"

                )

            ]

        )

    return Response(

        output.getvalue(),

        mimetype="text/csv",

        headers={

            "Content-Disposition":

            "attachment; filename=prediction_history.csv"

        }

    )