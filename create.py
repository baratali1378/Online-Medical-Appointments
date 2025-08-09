import requests
import json
from faker import Faker
import random

STRAPI_URL = "http://localhost:1337"
DOCTORS_FILE = "doctors_with_tokens.json"

fake = Faker()

def load_doctors():
    with open(DOCTORS_FILE, "r") as f:
        return json.load(f)

def generate_personal_info():
    gender = random.choice(["Male", "Female"])
    # Choose name based on gender
    if gender == "Male":
        fullname = fake.name_male()
    else:
        fullname = fake.name_female()

    birthdate = fake.date_of_birth(minimum_age=30, maximum_age=65).isoformat()
    biography = fake.paragraph(nb_sentences=5)
    email = fake.email()

    return {
        "fullname": fullname,
        "gender": gender,
        "birth": birthdate,
        "biography": biography,
        "email": email,
    }

def update_doctor_personal_info(doctor_id, token, personal_info):
    url = f"{STRAPI_URL}/api/doctor/profile"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    payload = {
        "data": {
            "personal_info": {
                "fullname": personal_info["fullname"],
                "gender": personal_info["gender"],
                "birth": personal_info["birth"],
                "email": personal_info["email"]
            },
            "biography": personal_info["biography"]
        }
    }

    resp = requests.put(url, headers=headers, json=payload)
    if resp.status_code == 200:
        print(f"✅ Updated doctor {doctor_id}: {personal_info['fullname']} ({personal_info['gender']})")
    else:
        print(f"❌ Failed to update doctor {doctor_id}: {resp.status_code} {resp.text}")

def main():
    doctors = load_doctors()

    for doctor in doctors:
        doctor_id = doctor.get("id")
        token = doctor.get("token")
        if not doctor_id or not token:
            print("⚠ Missing id or token for doctor, skipping...")
            continue

        personal_info = generate_personal_info()
        update_doctor_personal_info(doctor_id, token, personal_info)

if __name__ == "__main__":
    main()
