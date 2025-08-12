import json
import requests
import os

API_BASE_URL = "http://localhost:1337/api"  # <-- Change to your API URL
DOCTORS_FILE = "doctors_with_tokens.json"   # Path to your doctors_with_tokens.json

def get_pending_appointments(doctor_token):
    """Fetch all doctor's pending appointments"""
    url = f"{API_BASE_URL}/appointments/doctor"
    params = {"status": "Pending"}
    headers = {"Authorization": f"Bearer {doctor_token}"}

    try:
        response = requests.get(url, headers=headers, params=params, timeout=10)
        if response.status_code == 200:
            return response.json().get("data", [])
        else:
            print(f"❌ Failed to get appointments: {response.status_code} {response.text}")
            return []
    except requests.RequestException as e:
        print(f"❌ Error fetching appointments: {e}")
        return []

def change_status_to_completed(doctor_token, appointment_id):
    """Update appointment status to Completed"""
    url = f"{API_BASE_URL}/appointments/doctor"
    headers = {
        "Authorization": f"Bearer {doctor_token}",
        "Content-Type": "application/json",
    }
    payload = {
        "id": appointment_id,
        "status": "Completed"
    }

    try:
        response = requests.put(url, headers=headers, json=payload, timeout=10)
        if response.status_code in (200, 201):
            print(f"✅ Appointment {appointment_id} updated to Completed")
            return True
        else:
            print(f"❌ Failed to update appointment: {response.status_code} {response.text}")
            return False
    except requests.RequestException as e:
        print(f"❌ Error updating appointment: {e}")
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

        appointments = get_pending_appointments(doctor_token)
        if not appointments:
            print("⏭ No pending appointments found.")
            continue

        print(f"📋 Found {len(appointments)} pending appointments.")
        for appointment in appointments:
            appointment_id = appointment.get("id")
            if appointment_id:
                change_status_to_completed(doctor_token, appointment_id)

    print("\n🎯 Finished processing all doctors.")

if __name__ == "__main__":
    main()
