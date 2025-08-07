import requests
from faker import Faker
import random

fake = Faker()

STRAPI_URL = "http://localhost:1337"
SIGNUP_ENDPOINT = f"{STRAPI_URL}/api/patients/signup"
CITIES_ENDPOINT = f"{STRAPI_URL}/api/cities"
TOKEN_FILE = "patient_tokens.txt"

AFGHAN_CITIES = [
    "Kabul", "Herat", "Kandahar", "Mazar-i-Sharif", "Jalalabad", "Kunduz",
    "Ghazni", "Bamyan", "Lashkar Gah", "Faizabad", "Baghlan", "Taloqan"
]

def get_valid_city_names():
    """Fetch all cities and return valid Afghan city names."""
    response = requests.get(CITIES_ENDPOINT)
    response.raise_for_status()
    data = response.json().get("data", [])

    city_names = []
    for item in data:
        # Support both REST default (item['attributes']['name']) and flat name
        name = (
            item.get("attributes", {}).get("name")
            or item.get("name")
        )
        if name in AFGHAN_CITIES:
            city_names.append(name)

    if not city_names:
        raise Exception("⚠️ No Afghan cities found in Strapi DB.")

    return city_names

def create_patient_payload(city_name):
    return {
        "name": fake.name(),
        "email": fake.unique.email(),
        "password": "Test1234!",
        "phone": fake.msisdn()[:10],
        "city": city_name,
        "gender": random.choice(["Male", "Female", "Others"]),
    }

def main():
    city_names = get_valid_city_names()
    tokens = []

    for i in range(1, 21):
        city_name = random.choice(city_names)
        payload = { "data": create_patient_payload(city_name) }

        try:
            res = requests.post(SIGNUP_ENDPOINT, json=payload)
            res.raise_for_status()
            result = res.json()

            token = result.get("token")
            if token:
                print(f"✅ Patient {i} created.")
                tokens.append(token)
            else:
                print(f"⚠️  Patient {i} created but token missing.")
        except requests.exceptions.RequestException as err:
            print(f"❌ Failed to create patient {i}: {err}")
            try:
                print("   ↪ Response:", res.json())
            except:
                print("   ↪ Raw response:", res.text)

    with open(TOKEN_FILE, "w") as f:
        for t in tokens:
            f.write(t + "\n")

    print(f"\n📦 Done. Saved {len(tokens)} tokens to '{TOKEN_FILE}'.")

if __name__ == "__main__":
    main()
