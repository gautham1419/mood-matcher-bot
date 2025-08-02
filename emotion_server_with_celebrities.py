# Install dependencies if not already installed
# !pip install fastapi uvicorn transformers torch

from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware
import random

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

# Import real celebrity dataset
from real_celebrity_dataset import CELEBRITY_DATASET

# Intelligent Emotion Clustering - Map multiple emotions to your dataset labels
EMOTION_CLUSTERS = {
    # Happy/Positive Emotions
    'happy': ['happy', 'joy', 'excited', 'enthusiastic', 'cheerful', 'delighted'],
    'confident': ['confident', 'proud', 'assured', 'certain', 'sure'],
    'humorous': ['humorous', 'funny', 'amused', 'entertained', 'jovial'],
    
    # Sad/Negative Emotions
    'sad': ['sad', 'sadness', 'depressed', 'melancholy', 'gloomy', 'down'],
    'angry': ['angry', 'anger', 'furious', 'irritated', 'mad', 'frustrated'],
    'scared': ['scared', 'fear', 'afraid', 'terrified', 'anxious', 'worried'],
    
    # Social/Interactive Emotions
    'greeting': ['greeting', 'greet', 'hello', 'hi', 'welcome'],
    'romantic': ['romantic', 'love', 'passionate', 'affectionate', 'loving'],
    'curious': ['curious', 'curiosity', 'interested', 'inquisitive', 'questioning'],
    'confused': ['confused', 'confusion', 'puzzled', 'uncertain', 'doubtful'],
    
    # Intent-based Categories
    'story': ['story', 'narrative', 'tale', 'anecdote'],
    'insult': ['insult', 'offensive', 'rude', 'disrespectful'],
    'casual': ['casual', 'normal', 'regular', 'ordinary', 'everyday'],
    
    # Other Categories
    'bye': ['bye', 'goodbye', 'farewell', 'see you'],
    'thanks': ['thanks', 'thankful', 'grateful', 'appreciative'],
    'advice': ['advice', 'helpful', 'suggestive', 'recommendation'],
    'song': ['song', 'music', 'singing', 'melody'],
}

# Reverse mapping for quick lookup
EMOTION_TO_CLUSTER = {}
for cluster, emotions in EMOTION_CLUSTERS.items():
    for emotion in emotions:
        EMOTION_TO_CLUSTER[emotion] = cluster

# Define request schema
class UserInput(BaseModel):
    text: str

# Intelligent Emotion Classifier with Clustering
def intelligent_emotion_classifier(text: str):
    text_lower = text.lower()

    # Keyword-based detection with clustering
    keyword_mappings = [
        # Happy/Positive
        (['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing'], 'happy'),
        (['confident', 'sure', 'certain', 'proud'], 'confident'),
        (['funny', 'humor', 'laugh', 'hehe', 'joke'], 'humorous'),
        
        # Sad/Negative
        (['sad', 'depressed', 'unhappy', 'miserable', 'down'], 'sad'),
        (['angry', 'mad', 'furious', 'irritated', 'frustrated'], 'angry'),
        (['scared', 'fear', 'afraid', 'terrified', 'anxious', 'worried'], 'scared'),
        
        # Social
        (['hello', 'hi', 'hey', 'morning', 'good morning'], 'greeting'),
        (['love', 'romantic', 'romance', 'passionate'], 'romantic'),
        (['curious', 'curiosity', 'ask', 'question', 'wonder'], 'curious'),
        (['confused', 'confusion', 'doubt', 'uncertain', 'puzzled'], 'confused'),
        
        # Intent-based
        (['story', 'tale', 'narrative'], 'story'),
        (['insult', 'stupid', 'idiot', 'dumb', 'ego'], 'insult'),
        (['casual', 'normal', 'regular', 'ordinary'], 'casual'),
        (['bye', 'goodbye', 'see you', 'later'], 'bye'),
        (['thank', 'thanks', 'grateful'], 'thanks'),
        (['advice', 'help', 'suggest', 'recommend'], 'advice'),
        (['sing', 'song', 'music', 'tune', 'melody'], 'song'),
    ]
    
    # Check keywords first
    for keywords, emotion in keyword_mappings:
        if any(word in text_lower for word in keywords):
            return emotion

    # Use AI model for emotion detection
    try:
        emotion_result = emotion_classifier(text)
        predicted_emotion = emotion_result[0]['label']
        confidence = emotion_result[0]['score']
        
        # Map AI model emotions to our clusters
        if confidence > 0.1:
            # Direct mapping from AI model to our clusters
            ai_to_cluster = {
                'joy': 'happy',
                'sadness': 'sad', 
                'anger': 'angry',
                'fear': 'scared',
                'love': 'romantic',
                'surprise': 'excited',
                'neutral': 'greeting'
            }
            
            mapped_emotion = ai_to_cluster.get(predicted_emotion, 'greeting')
            return mapped_emotion
            
    except Exception as e:
        print(f"Emotion classification failed: {e}")
    
    # Fallback to zero-shot for other intents
    try:
        zero_shot_result = zero_shot_classifier(text, candidate_labels=ZERO_SHOT_LABELS)
        predicted_intent = zero_shot_result["labels"][0]
        
        # Map zero-shot results to our clusters
        intent_to_cluster = {
            'greet': 'greeting',
            'joke': 'humorous',
            'story': 'story',
            'insult': 'insult',
            'advice': 'advice',
            'bye': 'bye',
            'thanks': 'thanks',
            'song': 'song',
        }
        
        return intent_to_cluster.get(predicted_intent, 'greeting')
        
    except Exception as e:
        print(f"Zero-shot classification failed: {e}")
        return "greeting"  # Default fallback

# Enhanced Random Celebrity Selection
def get_random_celebrity_response(emotion: str):
    """Get a random celebrity response for the given emotion"""
    
    # First, try to find the emotion in our dataset
    if emotion in CELEBRITY_DATASET:
        celebrities = list(CELEBRITY_DATASET[emotion].keys())
        if celebrities:
            selected_celebrity = random.choice(celebrities)
            return {
                "emotion": emotion,
                "celebrity": selected_celebrity,
                "response": CELEBRITY_DATASET[emotion][selected_celebrity]
            }
    
    # If emotion not found, try to find similar emotions
    similar_emotions = []
    for dataset_emotion in CELEBRITY_DATASET.keys():
        if emotion in dataset_emotion or dataset_emotion in emotion:
            similar_emotions.append(dataset_emotion)
    
    if similar_emotions:
        # Choose random similar emotion
        chosen_emotion = random.choice(similar_emotions)
        celebrities = list(CELEBRITY_DATASET[chosen_emotion].keys())
        selected_celebrity = random.choice(celebrities)
        return {
            "emotion": chosen_emotion,
            "celebrity": selected_celebrity,
            "response": CELEBRITY_DATASET[chosen_emotion][selected_celebrity]
        }
    
    # Final fallback - use greeting
    if 'greeting' in CELEBRITY_DATASET:
        celebrities = list(CELEBRITY_DATASET['greeting'].keys())
        selected_celebrity = random.choice(celebrities)
        return {
            "emotion": "greeting",
            "celebrity": selected_celebrity,
            "response": CELEBRITY_DATASET['greeting'][selected_celebrity]
        }
    
    # Ultimate fallback
    return {
        "emotion": "greeting",
        "celebrity": "georgesar",
        "response": {
            "image": "",
            "text": "helloooo",
            "audio": "https://drive.google.com/uc?export=download&id=1wwRDYJIKtO9QMDuw7lmYD6gHqYjlwBw3"
        }
    }

# API endpoint
@app.post("/predict")
async def predict(user_input: UserInput):
    try:
        # Use intelligent emotion classification
        predicted_emotion = intelligent_emotion_classifier(user_input.text)
        
        # Get random celebrity response
        celebrity_response = get_random_celebrity_response(predicted_emotion)
        
        return {
            "input": user_input.text,
            "predicted_emotion": predicted_emotion,
            "celebrity": celebrity_response["celebrity"],
            "image_url": celebrity_response["response"]["image"],
            "dialogue_text": celebrity_response["response"]["text"],
            "audio_url": celebrity_response["response"]["audio"]
        }
    except Exception as e:
        return {
            "input": user_input.text,
            "predicted_emotion": "greeting",
            "celebrity": "georgesar",
            "image_url": "",
            "dialogue_text": "helloooo",
            "audio_url": "https://drive.google.com/uc?export=download&id=1wwRDYJIKtO9QMDuw7lmYD6gHqYjlwBw3",
            "error": str(e)
        }

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Intelligent Celebrity Emotion Classification API is running!"}

# Test endpoint with clustering info
@app.get("/test")
async def test():
    test_texts = ["hello", "im sad", "im happy", "im angry", "im scared", "im in love", "tell me a story"]
    results = []
    for text in test_texts:
        result = intelligent_emotion_classifier(text)
        celebrity_response = get_random_celebrity_response(result)
        results.append({
            "text": text,
            "predicted_emotion": result,
            "celebrity": celebrity_response["celebrity"],
            "dialogue_text": celebrity_response["response"]["text"]
        })
    return {"test_results": results}

# Debug endpoint to see available emotions
@app.get("/emotions")
async def get_emotions():
    return {
        "available_emotions": list(CELEBRITY_DATASET.keys()),
        "emotion_clusters": EMOTION_CLUSTERS,
        "total_celebrities": sum(len(celebrities) for celebrities in CELEBRITY_DATASET.values())
    }

if __name__ == "__main__":
    print("Starting Intelligent Celebrity Emotion Classification API...")
    print("Loading models... This may take a few minutes on first run.")
    
    # Test the classifier
    print("Testing intelligent classifier...")
    test_result = intelligent_emotion_classifier("hello")
    print(f"Test result for 'hello': {test_result}")
    
    # Show available emotions
    print(f"📊 Available emotions in dataset: {list(CELEBRITY_DATASET.keys())}")
    print(f"🎭 Total celebrities: {sum(len(celebrities) for celebrities in CELEBRITY_DATASET.values())}")
    
    print("✅ Models loaded successfully!")
    print("🌐 Server will be available at: http://localhost:8000")
    print("📝 API endpoint: http://localhost:8000/predict")
    print("🧪 Test endpoint: http://localhost:8000/test")
    print("📊 Emotions endpoint: http://localhost:8000/emotions")
    print("🛑 Press Ctrl+C to stop the server")
    
    # Start server
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 