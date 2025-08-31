import requests
import json

API_URL = "http://localhost:1337/api/doctor/test-tokens"  # Adjust the URL to your API

def fetch_doctor_tokens():
    try:
        response = requests.get(API_URL, verify=False)  # verify=False to skip SSL verification if using self-signed cert
        response.raise_for_status()
        doctors = response.json()
        return doctors
    except requests.RequestException as e:
        print(f"Failed to fetch doctor tokens: {e}")
        return None

def save_to_file(data, filename="doctors_with_tokens.json"):
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Saved {len(data)} doctors with tokens to {filename}")

def main():
    doctors = fetch_doctor_tokens()
    if doctors:
        save_to_file(doctors)

if __name__ == "__main__":
    main()
