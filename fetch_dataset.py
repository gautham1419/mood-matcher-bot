import requests
import json
import csv
from io import StringIO

def fetch_google_sheet_data():
    """Fetch data from Google Sheets and convert to our format"""
    
    # Google Sheets API URL (public view)
    sheet_id = "1bQKZKzPlDx0LvmT7P8BJFiN989f9Pe1GUfOot6xJW5o"
    gid = "1289986606"
    
    # CSV export URL
    csv_url = f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv&gid={gid}"
    
    try:
        response = requests.get(csv_url)
        response.raise_for_status()
        
        # Parse CSV data
        csv_data = StringIO(response.text)
        reader = csv.DictReader(csv_data)
        
        # Convert to our dataset format
        dataset = {}
        
        for row in reader:
            character = row.get('character', '').strip()
            emotion = row.get('emotion', '').strip()
            audio_url = row.get('audio', '').strip()
            dialogue = row.get('dialogue', '').strip()
            image_url = row.get('image', '').strip()
            
            # Skip empty rows
            if not character or not emotion:
                continue
                
            # Initialize emotion if not exists
            if emotion not in dataset:
                dataset[emotion] = {}
            
            # Add character data
            dataset[emotion][character] = {
                "image": image_url,
                "text": dialogue,
                "audio": audio_url
            }
        
        return dataset
        
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def create_python_dataset():
    """Create Python code for the dataset"""
    
    dataset = fetch_google_sheet_data()
    
    if not dataset:
        print("Failed to fetch dataset")
        return
    
    # Create Python dictionary
    python_code = "# Real celebrity dataset from Google Sheets\n"
    python_code += "CELEBRITY_DATASET = {\n"
    
    for emotion, characters in dataset.items():
        python_code += f'    "{emotion}": {{\n'
        for character, data in characters.items():
            python_code += f'        "{character}": {{\n'
            python_code += f'            "image": "{data["image"]}",\n'
            python_code += f'            "text": "{data["text"]}",\n'
            python_code += f'            "audio": "{data["audio"]}"\n'
            python_code += f'        }},\n'
        python_code += "    },\n"
    
    python_code += "}\n"
    
    # Save to file
    with open('real_celebrity_dataset.py', 'w', encoding='utf-8') as f:
        f.write(python_code)
    
    print("✅ Dataset processed successfully!")
    print(f"📊 Found {len(dataset)} emotions:")
    for emotion in dataset.keys():
        print(f"   - {emotion}: {len(dataset[emotion])} characters")
    
    return dataset

if __name__ == "__main__":
    create_python_dataset() 