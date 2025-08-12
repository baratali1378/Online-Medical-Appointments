import requests
import json
import random

API_BASE_URL = "http://localhost:1337"
DOCTORS_FILE = "doctors_with_tokens.json"

def get_all_specialties():
    url = f"{API_BASE_URL}/api/specialties"
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    # Assuming data structure: { data: [{ id, attributes: { name } }, ...] }
    return data.get("data", [])

def update_doctor_specialties(token, doctor_id, specialty_ids):
    url = f"{API_BASE_URL}/api/doctor/profile"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    payload = {
        "data": {
            "specialties": [{"id": sid} for sid in specialty_ids]
        }
    }
    response = requests.put(url, headers=headers, json=payload)
    if response.status_code in (200, 201):
        print(f"Updated doctor {doctor_id} specialties: {specialty_ids}")
        return True
    else:
        print(f"Failed to update doctor {doctor_id}: {response.status_code} {response.text}")
        return False

def main():
    # Load doctors
    with open(DOCTORS_FILE, "r") as f:
        doctors = json.load(f)

    # Fetch all specialties
    specialties = get_all_specialties()
    if not specialties:
        print("No specialties found. Exiting.")
        return

    all_specialty_ids = [s["id"] for s in specialties]

    for doc in doctors:
        doctor_id = doc.get("id")
        token = doc.get("token")
        if not doctor_id or not token:
            print("Missing doctor ID or token, skipping...")
            continue

        # Pick 1 to 4 random specialties without duplicates
        count = random.randint(1, min(4, len(all_specialty_ids)))
        selected_specialty_ids = random.sample(all_specialty_ids, count)

        # Update doctor specialties
        update_doctor_specialties(token, doctor_id, selected_specialty_ids)

if __name__ == "__main__":
    main()
