import requests
import json
import random
from faker import Faker

API_BASE_URL = "http://localhost:1337"
DOCTORS_FILE = "doctors_with_tokens.json"
PATIENTS_FILE = "patient_with_tokens.json"

fake = Faker()

def get_doctor_slots(doctor_token):
    url = f"{API_BASE_URL}/api/doctor/available-slots"
    headers = {
        "Authorization": f"Bearer {doctor_token}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to get slots for doctor token {doctor_token[:10]}...: {response.status_code}")
        return []
    data = response.json()
    return data.get("data", [])

def create_appointment(patient_token, doctor_id, slot_id, note):
    url = f"{API_BASE_URL}/api/appointments/patient"
    headers = {
        "Authorization": f"Bearer {patient_token}",
        "Content-Type": "application/json",
    }
    payload = {
        "doctorId": doctor_id,
        "slotId": slot_id,
        "note": note
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code in (200, 201):
        print(f"Appointment created: Doctor {doctor_id} Slot {slot_id}")
        return True
    else:
        print(f"Failed to create appointment: {response.status_code} {response.text}")
        return False

def main():
    with open(DOCTORS_FILE) as f:
        doctors = json.load(f)
    with open(PATIENTS_FILE) as f:
        patients = json.load(f)

    doctors_info = {}
    for doc in doctors:
        doctor_id = doc.get("id")
        token = doc.get("token")
        if not doctor_id or not token:
            continue
        slots = get_doctor_slots(token)
        if not slots:
            print(f"No slots for doctor {doctor_id}")
        doctors_info[doctor_id] = {"token": token, "slots": slots}

    total_appointments_created = 0
    target_appointments = 500
    appointments_per_patient = 16  # to exceed 500 total with 31 patients

    for patient in patients:
        if total_appointments_created >= target_appointments:
            break

        patient_id = patient.get("id")
        patient_token = patient.get("token")
        if not patient_id or not patient_token:
            continue

        # Pick up to appointments_per_patient doctors randomly (or fewer if not enough)
        possible_doctors = list(doctors_info.keys())
        num_doctors_to_book = min(appointments_per_patient, len(possible_doctors))
        chosen_doctors = random.sample(possible_doctors, k=num_doctors_to_book)

        for doctor_id in chosen_doctors:
            if total_appointments_created >= target_appointments:
                break

            slots = doctors_info[doctor_id]["slots"]
            if not slots:
                continue

            # Filter slots with capacity > 0
            available_slots = [s for s in slots if s.get("capacity", 0) > 0]
            if not available_slots:
                continue

            slot = random.choice(available_slots)
            slot_id = slot.get("id")

            note = fake.sentence(nb_words=10)

            created = create_appointment(patient_token, doctor_id, slot_id, note)
            if created:
                total_appointments_created += 1
            else:
                print(f"Could not create appointment for patient {patient_id} with doctor {doctor_id} slot {slot_id}")

    print(f"Total appointments created: {total_appointments_created}")

if __name__ == "__main__":
    main()
