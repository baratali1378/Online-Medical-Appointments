import json
import requests
from faker import Faker

API_URL = "http://localhost:1337/api/doctor/available-slots"
APPOINTMENT_URL = "http://localhost:1337/api/appointments/patient"

fake = Faker()

def load_doctors(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def load_patients(filename):
    with open(filename, 'r') as f:
        return json.load(f)

def getIDAvailableSlots(token: str, doctor_id):
    """Get all available slot IDs for a doctor."""
    headers = {
        "Authorization": f"Bearer {token}",
    }
    response = requests.get(API_URL, headers=headers)
    if response.ok:
        data = response.json()
        results = []
        for x in data["data"]:
            id = x["id"]
            results.append(id)
        return results
    else:
        print(f"Failed to fetch slots for doctor {doctor_id}: {response.status_code} {response.text}")
        return []

def createAppointment(patient_token, doctorId, slotId):
    """Create a patient appointment for a given slot."""
    headers = {
        "Authorization": f"Bearer {patient_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "doctorId": doctorId,
        "slotId": slotId,
        "note": fake.sentence()
    }
    response = requests.post(APPOINTMENT_URL, json=payload, headers=headers)
    if response.ok:
        print(f"✅ Appointment created for Doctor {doctorId}, Slot {slotId}")
    else:
        print(f"❌ Failed to create appointment: {response.status_code} {response.text}")

def main():
    doctors = load_doctors('doctors_with_tokens.json')   # list of dicts with doctor.id and doctor.token
    patients = load_patients('patient_with_tokens.json') # list of dicts with patient.id and patient.token

    for patient in patients:
        patient_token = patient["token"]

        for doctor in doctors:
            doctor_id = doctor["id"]
            doctor_token = doctor["token"]

            # Get available slots from doctor's perspective
            slots = getIDAvailableSlots(doctor_token, doctor_id)

            # Take first 3 slots for this doctor
            selected_slots = slots[:3]

            for slot_id in selected_slots:
                createAppointment(patient_token, doctor_id, slot_id)

if __name__ == "__main__":
    main()
