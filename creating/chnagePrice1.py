import json
import requests
import os
import random

API_BASE_URL = "http://localhost:1337/api"
DOCTORS_FILE = "doctors_with_tokens.json"  # JSON file with doctor tokens

def get_doctor_slots(doctor_token):
    """Fetch doctor's available slots"""
    url = f"{API_BASE_URL}/doctor/available-slots"
    headers = {"Authorization": f"Bearer {doctor_token}"}

    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            print(f"❌ Failed to get slots: {response.status_code} {response.text}")
            return []
    except requests.RequestException as e:
        print(f"❌ Error fetching slots: {e}")
        return []

def update_price(doctor_token, slot_id, price):
    """Update slot price via Strapi"""
    url = f"{API_BASE_URL}/doctor/available-slots/testing"
    headers = {
        "Authorization": f"Bearer {doctor_token}",
        "Content-Type": "application/json"
    }
    payload = {"slotId": slot_id, "price": price}

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        if response.status_code in (200, 201):
            print(f"✅ Slot {slot_id} updated → ${price}")
            return True
        else:
            print(f"❌ Failed to update slot {slot_id}: {response.status_code} {response.text}")
            return False
    except requests.RequestException as e:
        print(f"❌ Error updating slot {slot_id}: {e}")
        return False

def main():
    if not os.path.exists(DOCTORS_FILE):
        print(f"❌ Doctors file not found: {DOCTORS_FILE}")
        return

    with open(DOCTORS_FILE, "r") as f:
        doctors = json.load(f)

    for doc in doctors:
        doctor_id = doc.get("id")
        doctor_token = doc.get("token")

        if not doctor_id or not doctor_token:
            continue

        print(f"\n🔍 Processing doctor ID: {doctor_id}")
        slots = get_doctor_slots(doctor_token)

        if not slots:
            print("⏭ No available slots found.")
            continue

        for slot in slots:
            slot_id = slot.get("id")
            if slot_id:
                random_price = random.randint(200, 1000)
                update_price(doctor_token, slot_id, random_price)

    print("\n🎯 Finished assigning random prices to all slots.")

if __name__ == "__main__":
    main()
