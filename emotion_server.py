# Install dependencies if not already installed
# !pip install fastapi uvicorn nest_asyncio pyngrok transformers torch

import nest_asyncio
from pyngrok import ngrok
from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

# Start FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize Pre-trained Emotion Classifier (FREE model)
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

# Initialize Zero-Shot Classifier for non-emotion intents
zero_shot_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# Define candidate labels for zero-shot
ZERO_SHOT_LABELS = [
    "advice", "bye", "greet", "insult", "joke", "random", "song", "story", "thanks"
]

# Emotion mapping from the pre-trained model to your labels
EMOTION_MAPPING = {
    'joy': 'happy',
    'sadness': 'sad', 
    'anger': 'angry',
    'fear': 'fear',
    'love': 'love',
    'surprise': 'excited',
    'neutral': 'greet'
}

# Define request schema
class UserInput(BaseModel):
    text: str

# Hybrid Classifier
def hybrid_classifier(text: str):
    text_lower = text.lower()

    # Keyword-based fallback for low-resource labels
    if any(word in text_lower for word in ["hello", "hi", "hey", "morning", "good morning"]):
        return "greet"
    if any(word in text_lower for word in ["bye", "goodbye", "see you", "later", "goodbye"]):
        return "bye"
    if any(word in text_lower for word in ["sing", "song", "music", "tune", "melody"]):
        return "song"
    if any(word in text_lower for word in ["thank", "thanks", "thank you"]):
        return "thanks"
    if any(word in text_lower for word in ["joke", "funny", "humor", "laugh"]):
        return "joke"
    if any(word in text_lower for word in ["story", "tale", "narrative"]):
        return "story"
    if any(word in text_lower for word in ["advice", "help", "suggest", "recommend"]):
        return "advice"
    if any(word in text_lower for word in ["insult", "stupid", "idiot", "dumb"]):
        return "insult"

    # Check if it's likely an emotion using the pre-trained emotion model
    try:
        emotion_result = emotion_classifier(text)
        predicted_emotion = emotion_result[0]['label']
        confidence = emotion_result[0]['score']
        
        # If confidence is high enough, use emotion mapping
        if confidence > 0.3:  # Adjust threshold as needed
            mapped_emotion = EMOTION_MAPPING.get(predicted_emotion, 'greet')
            return mapped_emotion
    except Exception as e:
        print(f"Emotion classification failed: {e}")
    
    # Fallback to zero-shot for other intents
    try:
        zero_shot_result = zero_shot_classifier(text, candidate_labels=ZERO_SHOT_LABELS)
        return zero_shot_result["labels"][0]
    except Exception as e:
        print(f"Zero-shot classification failed: {e}")
        return "greet"  # Default fallback

# API endpoint
@app.post("/predict")
async def predict(user_input: UserInput):
    try:
        predicted_label = hybrid_classifier(user_input.text)
        return {"input": user_input.text, "predicted_label": predicted_label}
    except Exception as e:
        return {"input": user_input.text, "predicted_label": "greet", "error": str(e)}

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Emotion Classification API is running!"}

# Test endpoint
@app.get("/test")
async def test():
    test_texts = ["hello", "im sad", "im happy", "goodbye", "thank you"]
    results = []
    for text in test_texts:
        result = hybrid_classifier(text)
        results.append({"text": text, "predicted": result})
    return {"test_results": results}

if __name__ == "__main__":
    # Expose via ngrok
    nest_asyncio.apply()
    
    print("Starting Emotion Classification API...")
    print("Loading models... This may take a few minutes on first run.")
    
    # Test the classifier
    print("Testing classifier...")
    test_result = hybrid_classifier("hello")
    print(f"Test result for 'hello': {test_result}")
    
    # Start ngrok
    public_url = ngrok.connect(8000)
    print(f"Public URL: {public_url}")
    
    # Start server
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 