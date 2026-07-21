import os
import librosa

DATASET = r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\dataset"

bad_files = []

for genre in os.listdir(DATASET):
    folder = os.path.join(DATASET, genre)

    if os.path.isdir(folder):
        for file in os.listdir(folder):
            if file.endswith(".au"):
                path = os.path.join(folder, file)

                try:
                    librosa.load(path, sr=None)

                except Exception:
                    bad_files.append(path)

print()
print("Corrupted Files")
print("-" * 40)

if len(bad_files) == 0:
    print("No corrupted files found.")

else:
    for file in bad_files:
        print(file)