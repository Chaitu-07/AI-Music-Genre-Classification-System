import pandas as pd

df = pd.read_csv(r"C:\Users\Chaitaya\OneDrive\Desktop\Music Genre Classification\backend\features\music_features.csv")
print(df.head())
print()
print("Shape :", df.shape)
print()
print("Missing Values")
print(df.isnull().sum())