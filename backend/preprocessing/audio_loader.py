import librosa


def load_audio(file_path, sample_rate=22050):
    signal, sample_rate = librosa.load(
        file_path,
        sr=sample_rate,
        mono=True
    )

    return signal, sample_rate