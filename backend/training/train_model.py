import os
import joblib
import pandas as pd

from sklearn.model_selection import (
    train_test_split,
    GridSearchCV,
    StratifiedKFold
)

from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder

from sklearn.svm import SVC

from sklearn.metrics import accuracy_score

# ==================================================
# Load Dataset
# ==================================================

df = pd.read_csv(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\features\music_features.csv")

X = df.drop("Genre", axis=1)

y = df["Genre"]

# ==================================================
# Encode Labels
# ==================================================

encoder = LabelEncoder()

y = encoder.fit_transform(y)

# ==================================================
# Train Test Split
# ==================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# ==================================================
# Feature Scaling
# ==================================================

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)

X_test = scaler.transform(X_test)

# ==================================================
# Cross Validation
# ==================================================

cv = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

# ==================================================
# Grid Search
# ==================================================

parameters = {

    "C": [1, 10, 50],

    "gamma": [
        "scale",
        0.1,
        0.01,
        0.001
    ],

    "kernel": [
        "rbf",
        "linear"
    ]

}

grid = GridSearchCV(

    estimator=SVC(probability=True),

    param_grid=parameters,

    cv=cv,

    scoring="accuracy",

    n_jobs=-1

)

print("=" * 50)
print("Training SVM using GridSearchCV")
print("=" * 50)

grid.fit(X_train, y_train)

best_model = grid.best_estimator_

# ==================================================
# Test Accuracy
# ==================================================

prediction = best_model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    prediction
)

print("\nBest Parameters")
print(grid.best_params_)

print("\nCross Validation Accuracy")
print(round(grid.best_score_,4))

print("\nTest Accuracy")
print(round(accuracy,4))

# ==================================================
# Save
# ==================================================

os.makedirs(
    "saved_models",
    exist_ok=True
)

joblib.dump(
    best_model,
    "saved_models/genre_model.pkl"
)

joblib.dump(
    scaler,
    "saved_models/scaler.pkl"
)

joblib.dump(
    encoder,
    "saved_models/label_encoder.pkl"
)

print("\nModel Saved Successfully.")