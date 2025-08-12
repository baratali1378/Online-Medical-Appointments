import requests
import json
import random
from faker import Faker

API_BASE_URL = "http://localhost:1337"
DOCTORS_FILE = "doctors_with_tokens.json"

faker = Faker()

def generate_random_slot():
    # Generate a random date (within next 30 days)
    date = faker.date_between(start_date="today", end_date="+30d").isoformat()
    
    # Generate a random start time between 8:00 and 16:00 (hour, minute)
    start_hour = random.randint(8, 16)
    start_minute = random.choice([0, 15, 30, 45])
    start_time = f"{start_hour:02d}:{start_minute:02d}:00"
    
    # Duration: 30 or 60 minutes
    duration = random.choice([30, 60])
    end_hour = start_hour
    end_minute = start_minute + duration
    
    # Handle minute overflow
    if end_minute >= 60:
        end_hour += 1
        end_minute -= 60
    if end_hour > 23:
        end_hour = 23
        end_minute = 59

    end_time = f"{end_hour:02d}:{end_minute:02d}:00"
    
    # Capacity between 1 and 5
    capacity = random.randint(15, 40)
    
    return {
        "date": date,
        "start_time": start_time,
        "end_time": end_time,
        "capacity": capacity,
        "is_active": True,
    }

def create_slot(token, slot_data):
    url = f"{API_BASE_URL}/api/doctor/available-slots"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    payload = {
        "data": slot_data
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code in (200, 201):
        print(f"Created slot on {slot_data['date']} from {slot_data['start_time']} to {slot_data['end_time']}")
        return True
    else:
        print(f"Failed to create slot: {response.status_code} {response.text}")
        return False

def main():
    with open(DOCTORS_FILE, "r") as f:
        doctors = json.load(f)

    for doc in doctors:
        doctor_id = doc.get("id")
        token = doc.get("token")
        if not doctor_id or not token:
            print("Missing doctor ID or token, skipping...")
            continue

        print(f"\nCreating slots for doctor ID: {doctor_id}")

        # Generate 4 to 8 slots per doctor
        slots_count = random.randint(4, 8)
        for _ in range(slots_count):
            slot = generate_random_slot()
            slot["doctor"] = doctor_id
            create_slot(token, slot)

if __name__ == "__main__":
    main()
