import librosa
import numpy as np


def trim_silence(signal):
    trimmed_signal, _ = librosa.effects.trim(
        signal,
        top_db=20
    )

    return trimmed_signal


def normalize(signal):
    return librosa.util.normalize(signal)


def fix_length(signal, sample_rate, duration=30):
    expected_length = sample_rate * duration

    if len(signal) > expected_length:
        signal = signal[:expected_length]
    else:
        padding = expected_length - len(signal)
        signal = np.pad(signal, (0, padding))

    return signal