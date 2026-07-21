from audio_loader import load_audio
from utils import trim_silence
from utils import normalize
from utils import fix_length

import soundfile as sf


def preprocess_audio(input_file, output_file):
    signal, sr = load_audio(input_file)
    signal = trim_silence(signal)
    signal = normalize(signal)
    signal = fix_length(signal, sr)
    sf.write(output_file, signal, sr)

    return True