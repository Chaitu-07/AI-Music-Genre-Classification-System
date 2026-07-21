import joblib
import numpy as np

from feature_extraction.extract_features import extract_features

MODEL = joblib.load(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\saved_models\genre_model.pkl")

SCALER = joblib.load(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\saved_models\scaler.pkl")

ENCODER = joblib.load(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\saved_models\label_encoder.pkl")


def predict_genre(audio_path):

    features = extract_features(audio_path)

    features = features.reshape(1,-1)

    features = SCALER.transform(features)

    probabilities = MODEL.predict_proba(features)[0]

    prediction_index = np.argmax(probabilities)

    genre = ENCODER.inverse_transform(
        [prediction_index]
    )[0]

    confidence = float(

        probabilities[prediction_index] * 100

    )

    sorted_indices = np.argsort(

        probabilities

    )[::-1]

    top_predictions = []

    for index in sorted_indices[:3]:

        top_predictions.append({

            "genre": ENCODER.inverse_transform(

                [index]

            )[0],

            "confidence": round(

                float(probabilities[index] * 100),

                2

            )

        })

    return {

        "genre": genre,

        "confidence": round(confidence,2),

        "top_predictions": top_predictions

    }

print("Loaded Model:")
print(MODEL)
print("Probability:", MODEL.probability)