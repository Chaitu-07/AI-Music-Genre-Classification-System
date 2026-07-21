from extract_features import extract_features

audio = "../preprocessed_dataset/blues/blues.00000.au"
features = extract_features(audio)
print("Total Features :", len(features))
print()
print(features)