import json
import requests
from faker import Faker
from time import sleep
import random

fake = Faker()

SIGNUP_URL = "http://localhost:1337/api/doctors/signup"  # Update if needed
CITIES_URL = "http://localhost:1337/api/cities"          # Your cities API endpoint
OUTPUT_FILE = "doctors_with_tokens.json"
NUM_DOCTORS = 50

def fetch_cities():
    try:
        response = requests.get(CITIES_URL)
        response.raise_for_status()
        data = response.json()
        # Assuming cities are in data['data'] and each city has attributes.name
        cities = [city["name"] for city in data.get("data", [])]
        if not cities:
            raise Exception("No cities found in API response.")
        return cities
    except Exception as e:
        print(f"Error fetching cities: {e}")
        return []

def create_doctor(city):
    gender = random.choice(["Male", "Female"])
    if gender == "male":
        name = fake.name_male()
    else:
        name = fake.name_female()

    email = fake.unique.email()
    password = fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True)
    experience = f"{fake.random_int(min=1, max=20)} years"
    birth_data = fake.date_of_birth(minimum_age=30, maximum_age=80).isoformat()

    payload = {
        "data": {
        "name": name,
        "email": email,
        "birth": birth_data,
        "password": password,
        "experience": experience,
        "city": city,
        "gender": gender,
          }  # pass gender if your API supports it
    }

    try:
        response = requests.post(SIGNUP_URL, json=payload)
        response.raise_for_status()
        data = response.json()
        token = data.get("token")
        if token:
            print(f"Created doctor: {name} ({email}) in city: {city} with password: {password} and gender: {gender}")
            return {"name": name, "email": email, "password": password, "token": token, "gender": gender}
        else:
            print(f"Signup response missing token for {email}")
    except Exception as e:
        print(f"Failed to create doctor {email}: {e}")

    return None

def main():
    cities = fetch_cities()
    if not cities:
        print("No cities available, exiting...")
        return

    doctors = []
    for _ in range(NUM_DOCTORS):
        city = random.choice(cities)
        doctor = create_doctor(city)
        if doctor:
            doctors.append(doctor)
        sleep(0.2)  # avoid hammering your API

    with open(OUTPUT_FILE, "w") as f:
        json.dump(doctors, f, indent=2)

    print(f"\nCreated {len(doctors)} doctors and saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
