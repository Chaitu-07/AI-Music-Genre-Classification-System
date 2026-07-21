from app.predictor import predict_genre

audio = r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\preprocessed_dataset\classical\classical.00002.au"

result = predict_genre(audio)

print(result)