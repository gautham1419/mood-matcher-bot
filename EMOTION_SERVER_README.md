# 🎭 Emotion Classification API

A free, pre-trained emotion classification server that uses hybrid classification (keyword-based + pre-trained models) to accurately classify emotions and intents in text.

## ✨ Features

- **Pre-trained Emotion Model**: Uses `j-hartmann/emotion-english-distilroberta-base` for accurate emotion detection
- **Zero-shot Classification**: Handles non-emotion intents like greetings, goodbyes, etc.
- **Hybrid Approach**: Combines keyword matching with ML models for best results
- **CORS Enabled**: Works seamlessly with web applications
- **Free**: No API costs, runs completely offline
- **Robust**: Handles various text formats and edge cases

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)
```bash
python setup_emotion_server.py
```

### Option 2: Manual Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python emotion_server.py
```

## 📋 Supported Emotions & Intents

### Emotions (via Pre-trained Model):
- **happy** ← joy
- **sad** ← sadness  
- **angry** ← anger
- **fear** ← fear
- **love** ← love
- **excited** ← surprise
- **greet** ← neutral

### Intents (via Zero-shot + Keywords):
- **greet** - hello, hi, hey, morning
- **bye** - goodbye, see you, later
- **thanks** - thank you, thanks
- **joke** - joke, funny, humor
- **story** - story, tale, narrative
- **song** - sing, song, music
- **advice** - help, suggest, recommend
- **insult** - stupid, idiot, dumb

## 🔧 API Usage

### Endpoint: `POST /predict`

**Request:**
```json
{
  "text": "I'm feeling sad today"
}
```

**Response:**
```json
{
  "input": "I'm feeling sad today",
  "predicted_label": "sad"
}
```

### Test Endpoints:
- `GET /` - Health check
- `GET /test` - Test with sample inputs

## 🎯 Why This Approach is Better

1. **No Training Required**: Uses pre-trained models that work out-of-the-box
2. **Handles Informal Text**: Works with "im sad", "I'm happy", etc.
3. **Robust Error Handling**: Multiple fallback mechanisms
4. **Fast**: Keyword matching for common cases, ML for complex ones
5. **Accurate**: Pre-trained models are specifically designed for emotion classification

## 🔍 How It Works

1. **Keyword Check**: First checks for common patterns (hello, goodbye, etc.)
2. **Emotion Classification**: Uses pre-trained emotion model for emotional text
3. **Zero-shot Fallback**: Uses zero-shot classification for other intents
4. **Default Fallback**: Returns "greet" if all else fails

## 🛠️ Customization

You can easily modify:
- **Emotion mapping** in `EMOTION_MAPPING`
- **Keywords** in the hybrid_classifier function
- **Confidence threshold** (currently 0.3)
- **Candidate labels** for zero-shot classification

## 📊 Performance

- **First run**: ~2-3 minutes (model download)
- **Subsequent runs**: ~30 seconds (model loading)
- **Response time**: <1 second per request
- **Accuracy**: High for emotions, good for intents

## 🚨 Troubleshooting

### Common Issues:
1. **Model download fails**: Check internet connection
2. **Port 8000 in use**: Change port in emotion_server.py
3. **Memory issues**: Close other applications

### Error Messages:
- "Model loading failed": Check transformers installation
- "CORS error": Already handled in the code
- "500 Internal Server Error": Check the hybrid_classifier function

## 🎉 Ready to Use!

Once running, your frontend can connect to the new ngrok URL and get much more accurate emotion classification! 