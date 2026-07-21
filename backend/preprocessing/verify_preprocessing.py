import librosa

audio = "../preprocessed_dataset/blues/blues.00000.au"

signal, sr = librosa.load(audio)

print("Sample Rate :", sr)

print(
    "Duration :",
    librosa.get_duration(
        y=signal,
        sr=sr
    )
)