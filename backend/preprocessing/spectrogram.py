import librosa
import librosa.display
import matplotlib.pyplot as plt
import numpy as np

audio = "../dataset/blues/blues.00000.au"
signal, sr = librosa.load(audio)
spectrogram = librosa.amplitude_to_db(
    np.abs(librosa.stft(signal)),
    ref=np.max
)

plt.figure(figsize=(12, 5))
librosa.display.specshow(
    spectrogram,
    sr=sr,
    x_axis="time",
    y_axis="log"
)

plt.colorbar(format="%+2.0f dB")
plt.title("Spectrogram")
plt.tight_layout()

plt.show()