import os
import pandas as pd

from extract_features import extract_features

DATASET = "../preprocessed_dataset"

rows = []

for genre in sorted(os.listdir(DATASET)):

    genre_path = os.path.join(DATASET, genre)

    if os.path.isdir(genre_path):

        for file in os.listdir(genre_path):

            if file.lower().endswith((".wav", ".au")):

                path = os.path.join(
                    genre_path,
                    file
                )

                features = extract_features(path)

                row = list(features)

                row.append(genre)

                rows.append(row)

                print(f"{genre} -> {file}")

columns = []

for i in range(70):
    columns.append(f"Feature_{i+1}")

columns.append("Genre")

df = pd.DataFrame(rows, columns=columns)

os.makedirs("../features", exist_ok=True)

df.to_csv(
    "../features/music_features.csv",
    index=False
)

print("\nDataset Created Successfully!")
print(df.shape)