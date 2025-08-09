import requests
import json

# Config
API_URL = "http://localhost:1337/api/doctor/test-tokens"  # Replace with your actual API endpoint that returns doctors + tokens
OUTPUT_FILE = "doctors_with_tokens.json"

def fetch_doctors_with_tokens():
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json()

def save_to_file(data, filename):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Data saved to {filename}")

if __name__ == "__main__":
    doctors_data = fetch_doctors_with_tokens()
    save_to_file(doctors_data, OUTPUT_FILE)
