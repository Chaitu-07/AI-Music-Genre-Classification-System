import joblib
import pandas as pd

from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

import matplotlib.pyplot as plt

# =======================================
# Load Dataset
# =======================================

df = pd.read_csv(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\features\music_features.csv")

X = df.drop("Genre", axis=1)

y = df["Genre"]

encoder = LabelEncoder()

y = encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.20,

    random_state=42,

    stratify=y

)

# =======================================
# Load Saved Model
# =======================================

model = joblib.load("saved_models/genre_model.pkl")

scaler = joblib.load("saved_models/scaler.pkl")

X_test = scaler.transform(X_test)

prediction = model.predict(X_test)

# =======================================
# Classification Report
# =======================================

print("=" * 60)
print("Classification Report")
print("=" * 60)

print(

    classification_report(

        y_test,

        prediction,

        target_names=encoder.classes_

    )

)

# =======================================
# Confusion Matrix
# =======================================

cm = confusion_matrix(

    y_test,

    prediction

)

disp = ConfusionMatrixDisplay(

    confusion_matrix=cm,

    display_labels=encoder.classes_

)

disp.plot(

    xticks_rotation=45

)

plt.tight_layout()

plt.show()