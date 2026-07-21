from audio_preprocessing import preprocess_audio

input_audio = "../dataset/blues/blues.00000.au"

output_audio = "../preprocessed_dataset/blues_test.au"

preprocess_audio(
    input_audio,
    output_audio
)

print("Audio preprocessing completed successfully.")