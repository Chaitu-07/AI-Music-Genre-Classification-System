import librosa
import librosa.display
import matplotlib.pyplot as plt

original = "../dataset/blues/blues.00000.au"

processed = "../preprocessed_dataset/blues/blues.00000.au"

signal1, sr = librosa.load(original)

signal2, sr = librosa.load(processed)

plt.figure(figsize=(12,4))
librosa.display.waveshow(signal1, sr=sr)
plt.title("Original Audio")
plt.show()

plt.figure(figsize=(12,4))
librosa.display.waveshow(signal2, sr=sr)
plt.title("Processed Audio")
plt.show()