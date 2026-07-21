import librosa

audio_path = "../dataset/blues/blues.00000.au"

signal, sample_rate = librosa.load(audio_path)

print("=" * 40)

print("Audio Information")

print("=" * 40)

print("Sample Rate :", sample_rate)

print("Signal Length :", len(signal))

print("Duration :", librosa.get_duration(y=signal, sr=sample_rate), "seconds")

print("=" * 40)