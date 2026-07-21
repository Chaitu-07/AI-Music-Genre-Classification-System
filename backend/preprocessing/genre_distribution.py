import os
import matplotlib.pyplot as plt

DATASET = r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\dataset"

genres = []
counts = []

for genre in sorted(os.listdir(DATASET)):
    folder = os.path.join(DATASET, genre)

    if os.path.isdir(folder):
        genres.append(genre)

        counts.append(
            len([f for f in os.listdir(folder) if f.endswith(".wav")])
        )

plt.figure(figsize=(10, 5))

plt.bar(genres, counts)

plt.title("Genre Distribution")

plt.xlabel("Genres")

plt.ylabel("Number of Songs")

plt.xticks(rotation=45)

plt.tight_layout()

plt.show()