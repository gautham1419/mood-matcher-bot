#!/usr/bin/env python3
"""
Setup script for Emotion Classification API
This script will install dependencies and start the server
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ All packages installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing packages: {e}")
        return False
    return True

def run_server():
    """Run the emotion classification server"""
    print("Starting Emotion Classification API...")
    try:
        subprocess.run([sys.executable, "emotion_server.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error running server: {e}")

if __name__ == "__main__":
    print("🚀 Setting up Emotion Classification API...")
    
    # Check if requirements.txt exists
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found!")
        sys.exit(1)
    
    # Install requirements
    if install_requirements():
        # Run server
        run_server()
    else:
        print("❌ Setup failed!")
        sys.exit(1) 