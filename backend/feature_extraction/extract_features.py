import librosa
import numpy as np


def extract_features(file_path):
    signal, sr = librosa.load(file_path, sr=22050)

    features = []

    # ===========================
    # MFCC (20 Mean + 20 Std)
    # ===========================
    mfcc = librosa.feature.mfcc(
        y=signal,
        sr=sr,
        n_mfcc=20
    )

    features.extend(np.mean(mfcc, axis=1))
    features.extend(np.std(mfcc, axis=1))

    # ===========================
    # Chroma (12 Mean + 12 Std)
    # ===========================
    chroma = librosa.feature.chroma_stft(
        y=signal,
        sr=sr
    )

    features.extend(np.mean(chroma, axis=1))
    features.extend(np.std(chroma, axis=1))

    # ===========================
    # Spectral Centroid
    # ===========================
    centroid = librosa.feature.spectral_centroid(
        y=signal,
        sr=sr
    )

    features.append(np.mean(centroid))
    features.append(np.std(centroid))

    # ===========================
    # Zero Crossing Rate
    # ===========================
    zcr = librosa.feature.zero_crossing_rate(signal)

    features.append(np.mean(zcr))
    features.append(np.std(zcr))

    # ===========================
    # RMS Energy
    # ===========================
    rms = librosa.feature.rms(y=signal)

    features.append(np.mean(rms))
    features.append(np.std(rms))

    return np.array(features)