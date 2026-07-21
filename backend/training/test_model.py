from training.predict import predict_genre

audio = r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\preprocessed_dataset\blues\blues.00001.au"

prediction = predict_genre(audio)

print("=" * 40)

print("Predicted Genre :", prediction)

print("=" * 40)