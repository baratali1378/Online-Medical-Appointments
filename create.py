import json
import requests
from faker import Faker

# Create faker instance
fake = Faker()

# Path to your JSON file
DOCTORS_FILE = "doctors_with_tokens.json"

# Base URL for your Strapi API
BASE_URL = "http://localhost:1337/api/doctor/profile"  # Change to your domain

def generate_fake_clinic_info():
    """Generate fake clinic information for a doctor."""
    return {
        "clinic_info": {
            "address": fake.address(),
            "phone": fake.msisdn()[:10],  # 10-digit number
            "latitude": float(fake.latitude()),
            "longitude": float(fake.longitude()),
            "clinic_name": f"{fake.last_name()} Clinic"
        }
    }

def update_doctor_clinic(token, clinic_info):
    """Send a PUT request to update clinic info of a doctor."""
    headers = {
        "Authorization": f"Bearer {token}"
    }
    payload = {
        "data": clinic_info
    }

    try:
        response = requests.put(BASE_URL, json=payload, headers=headers)
        if response.status_code == 200:
            print("✅ Updated clinic info successfully")
        else:
            print(f"❌ Failed to update clinic info: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"⚠ Error updating clinic info: {e}")

def main():
    # Load doctors with tokens
    with open(DOCTORS_FILE, "r") as f:
        doctors = json.load(f)

    for doctor in doctors:
        token = doctor.get("token")
        if not token:
            print("⚠ No token found for doctor, skipping...")
            continue
        
        clinic_info = generate_fake_clinic_info()
        update_doctor_clinic(token, clinic_info)

if __name__ == "__main__":
    main()
