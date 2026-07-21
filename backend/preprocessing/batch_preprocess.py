import os

from audio_preprocessing import preprocess_audio

SOURCE = r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\dataset"
DESTINATION = "../preprocessed_dataset"
os.makedirs(DESTINATION, exist_ok=True)
genres = sorted(os.listdir(SOURCE))

for genre in genres:
    genre_source = os.path.join(SOURCE, genre)
    genre_destination = os.path.join(
        DESTINATION,
        genre
    )

    os.makedirs(
        genre_destination,
        exist_ok=True
    )

    for file in os.listdir(genre_source):
        if file.endswith(".au"):
            input_path = os.path.join(
                genre_source,
                file
            )

            output_path = os.path.join(
                genre_destination,
                file
            )

            preprocess_audio(
                input_path,
                output_path
            )

    print(f"{genre} completed.")

print()
print("All songs preprocessed successfully.")