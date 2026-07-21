import pandas as pd

df = pd.read_csv("features/music_features.csv")

print("=" * 40)
print("Dataset Shape")
print("=" * 40)
print(df.shape)

print()

print("=" * 40)
print("Genre Distribution")
print("=" * 40)
print(df["Genre"].value_counts())