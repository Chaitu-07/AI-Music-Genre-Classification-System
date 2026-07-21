# 🎵AI-Music Genre Classification System using Machine Learning

A web-based Music Genre Classification System that predicts the genre of an uploaded audio file using Machine Learning. The application combines audio signal processing, feature extraction, and a Flask web interface to provide fast and accurate genre predictions with confidence scores.


## 📌 Project Overview

Music genre classification is an important application of Machine Learning in the field of Music Information Retrieval (MIR). This project analyzes an audio file, extracts its acoustic features, and predicts its genre using a trained Support Vector Machine (SVM) classifier.

The application provides an intuitive web interface where users can upload an audio file, receive genre predictions, and manage previous predictions through a searchable history dashboard.


## ✨ Features

- 🎵 Upload audio files (.wav and .au)
- 🤖 AI-powered music genre prediction
- 📊 Confidence score visualization
- 📈 Top predicted genres
- 🗂 Prediction history stored using SQLite
- 🔍 Search prediction history
- 🎼 Filter by genre
- 📅 Sort by date
- ⭐ Sort by confidence
- 🗑 Delete individual predictions
- 🧹 Clear prediction history
- 📤 Export prediction history to CSV
- 📱 Responsive and modern user interface


## 🎼 Supported Genres

The model classifies music into the following genres:

- Blues
- Classical
- Country
- Disco
- Hip Hop
- Jazz
- Metal
- Pop
- Reggae
- Rock


## 🧠 Machine Learning Workflow

Dataset
→ Audio Preprocessing
→ Feature Extraction
→ Feature Scaling
→ Model Training
→ Genre Prediction
→ Flask Web Application


## 🛠 Tech Stack

### Programming Language

- Python 3.12

### Machine Learning

- Scikit-learn
- Librosa
- NumPy
- Pandas

### Web Development

- Flask
- HTML5
- CSS3
- JavaScript

### Database

- SQLite
- SQLAlchemy

### Model

- Support Vector Machine (SVM)


## 📊 Dataset

This project uses the **GTZAN Genre Collection Dataset**.

The dataset contains:

- 10 Music Genres
- 100 Audio Files per Genre
- Total: 1000 Audio Samples

Due to GitHub file size limitations, the dataset is **not included** in this repository.

Download it from:

https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification

Place the extracted dataset inside:

```
backend/dataset/
```

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/Music-Genre-Classification-System.git
```

Navigate to the project

```bash
cd Music-Genre-Classification-System/backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```


## ▶ Running the Project

Start Flask

```bash
python app.py
```

Open browser

```
http://127.0.0.1:5000
```


## 📈 Model Performance

Algorithm Used:

- Support Vector Machine (SVM)

Feature Extraction:

- MFCC
- Chroma Features
- Spectral Centroid
- Zero Crossing Rate
- RMS Energy

Model Accuracy:

```
≈75%
```


## 🚀 Future Improvements

- Deep Learning (CNN)
- Real-time microphone prediction
- User authentication
- Cloud deployment
- Audio waveform visualization
- Support for MP3 and FLAC files
- Model comparison dashboard


## 👨‍💻 Author

**Chaitanya**

Bachelor of Technology (B.Tech)

Music Genre Classification using Machine Learning


## 📄 License

This project is developed for educational and academic purposes.

Feel free to fork, modify, and improve the project for learning purposes.
