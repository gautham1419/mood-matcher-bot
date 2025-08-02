import re

def update_dataset_images():
    """Update all empty image URLs in the dataset with placeholder images"""
    
    # Read the current dataset file
    with open('real_celebrity_dataset.py', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all celebrity names and update their images
    celebrities = [
        'dharmajan', 'dileep', 'lalualex', 'lalstory', 'jayaram', 'vinayakan',
        'georgesar', 'rimitomi', 'nivin', 'prithviraj', 'suraj', 'chembanvinod'
    ]
    
    # Update each celebrity's image
    for celebrity in celebrities:
        # Pattern to match empty image URLs for this celebrity
        pattern = f'"{celebrity}": {{\n            "image": "",'
        replacement = f'"{celebrity}": {{\n            "image": "https://ui-avatars.com/api/?name={celebrity}&background=random&color=fff&size=128&rounded=true&bold=true",'
        
        content = content.replace(pattern, replacement)
    
    # Write the updated content back
    with open('real_celebrity_dataset.py', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("✅ Updated all celebrity images with placeholder avatars!")

if __name__ == "__main__":
    update_dataset_images() 