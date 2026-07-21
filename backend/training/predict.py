import joblib

from feature_extraction.extract_features import extract_features


model = joblib.load(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\saved_models\genre_model.pkl")

scaler = joblib.load(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\saved_models\scaler.pkl")

encoder = joblib.load(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\saved_models\label_encoder.pkl")


def predict_genre(audio_file):

    features = extract_features(audio_file)

    features = scaler.transform([features])

    prediction = model.predict(features)

    genre = encoder.inverse_transform(prediction)

    return genre[0]