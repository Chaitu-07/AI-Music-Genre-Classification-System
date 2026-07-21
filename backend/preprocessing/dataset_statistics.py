import os
import pandas as pd

DATASET = "../dataset"

rows = []

for genre in sorted(os.listdir(DATASET)):
    folder = os.path.join(DATASET, genre)

    if os.path.isdir(folder):
        count = len([
            f for f in os.listdir(folder)
            if f.endswith(".wav")
        ])
        rows.append([genre, count])

df = pd.DataFrame(rows, columns=["Genre", "Songs"])
print(df)
print()

print(df.describe())