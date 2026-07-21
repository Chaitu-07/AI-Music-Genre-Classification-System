import joblib

model = joblib.load("saved_models/genre_model.pkl")

print(type(model))
print(model)

print("\nProbability:", model.probability)