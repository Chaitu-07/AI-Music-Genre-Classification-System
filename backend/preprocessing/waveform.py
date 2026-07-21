import librosa
import librosa.display
import matplotlib.pyplot as plt

audio = "../dataset/blues/blues.00000.au"
signal, sr = librosa.load(audio)

plt.figure(figsize=(12, 4))
librosa.display.waveshow(signal, sr=sr)
plt.title("Waveform")
plt.xlabel("Time")
plt.ylabel("Amplitude")
plt.tight_layout()

plt.show()