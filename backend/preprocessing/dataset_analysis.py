import os

DATASET_PATH = "C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\dataset"

print("=" * 50)
print("Music Genre Dataset Analysis")
print("=" * 50)

if not os.path.exists(DATASET_PATH):
    print("Dataset folder not found!")
    exit()

genres = sorted(os.listdir(DATASET_PATH))
total_files = 0

for genre in genres:
    genre_path = os.path.join(DATASET_PATH, genre)

    if os.path.isdir(genre_path):
        files = [f for f in os.listdir(genre_path)]
        print(f"{genre:<12} : {len(files)} songs")
        total_files += len(files)

print("-" * 50)
print(f"Total Genres : {len(genres)}")
print(f"Total Songs  : {total_files}")
print("=" * 50)