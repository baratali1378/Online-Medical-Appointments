import requests
import random
import json
from time import sleep
from faker import Faker
from tqdm import tqdm  # For progress bars

# Initialize Faker
fake = Faker()

# Configuration
STRAPI_URL = "http://localhost:1337"  # Change to your Strapi URL
PATIENTS_FILE = "patient_with_tokens.json"  # Path to your patients file

# Emoji sets for different review aspects
EMOJI_SETS = {
    'positive': ['😊', '😍', '👍', '🌟', '✨', '💯', '👏', '🎉', '🏆', '❤️', '🩺', '👨‍⚕️', '👩‍⚕️'],
    'neutral': ['😐', '🤔', '🙂', '👌', '💁', '✌️', '🫤', '🫡', '🤷', '😶'],
    'negative': ['😕', '😞', '👎', '😤', '😠', '💢', '😒', '🙄', '🤨', '😑']
}

def load_patient_tokens():
    """Load patient tokens from JSON file"""
    try:
        with open(PATIENTS_FILE, 'r') as f:
            patients = json.load(f)
        return patients
    except Exception as e:
        print(f"Error loading patient tokens: {e}")
        return []

def generate_fake_review(rating, doctor_name):
    """Generate a fake review with emojis based on rating"""
    # Base template
    if rating >= 4.5:
        templates = [
            f"Dr. {doctor_name} was phenomenal! {random.choice(EMOJI_SETS['positive'])}",
            f"I can't praise Dr. {doctor_name} enough! {random.choice(EMOJI_SETS['positive'])}",
            f"⭐⭐⭐⭐⭐ Absolutely perfect! {random.choice(EMOJI_SETS['positive'])}"
        ]
    elif rating >= 4:
        templates = [
            f"Dr. {doctor_name} was excellent {random.choice(EMOJI_SETS['positive'])}",
            f"Very satisfied with Dr. {doctor_name}'s care {random.choice(EMOJI_SETS['positive'])}",
            f"⭐⭐⭐⭐ Would definitely recommend! {random.choice(EMOJI_SETS['positive'])}"
        ]
    else:  # 3-3.9
        templates = [
            f"Dr. {doctor_name} was acceptable {random.choice(EMOJI_SETS['neutral'])}",
            f"Decent experience with Dr. {doctor_name} {random.choice(EMOJI_SETS['neutral'])}",
            f"⭐⭐⭐ Could improve in some areas {random.choice(EMOJI_SETS['neutral'])}"
        ]
    
    # Generate detailed review
    review = random.choice(templates) + "\n\n"
    review += fake.paragraph(nb_sentences=random.randint(2, 4)) + " "
    review += random.choice(EMOJI_SETS['positive' if rating >=4 else 'neutral']) + "\n\n"
    
    # Add specific compliments or criticisms
    if rating >= 4.5:
        aspects = [
            "bedside manner", "diagnosis accuracy", "treatment plan", 
            "listening skills", "follow-up care", "professionalism"
        ]
        review += f"Especially appreciated the {random.choice(aspects)}! {random.choice(EMOJI_SETS['positive'])}"
    elif rating < 4:
        aspects = [
            "wait times", "communication", "availability",
            "thoroughness", "facility cleanliness"
        ]
        review += f"Could improve on {random.choice(aspects)}. {random.choice(EMOJI_SETS['neutral'])}"
    
    return review

def get_patient_appointments(patient_token):
    """Fetch all appointments for a patient"""
    headers = {"Authorization": f"Bearer {patient_token}"}
    url = f"{STRAPI_URL}/api/appointments/patient"
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json().get('data', [])
    except requests.exceptions.RequestException as e:
        print(f"\nError fetching appointments: {e}")
        return []

def create_review(patient_token, appointment_id, doctor_id, doctor_name, rating, comment):
    """Create a review for an appointment"""
    headers = {
        "Authorization": f"Bearer {patient_token}",
        "Content-Type": "application/json"
    }
    url = f"{STRAPI_URL}/api/patient/review"
    
    data = {
        "data": {
            "appointmentId": appointment_id,
            "rating": rating,
            "comment": comment,
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        print(f"\nError creating review for appointment {appointment_id}: {e}")
        return False

def main():
    # Load all patients
    patients = load_patient_tokens()
    if not patients:
        print("No patients found in the file")
        return
    
    print(f"Loaded {len(patients)} patients")
    
    # Process each patient
    for patient in tqdm(patients, desc="Processing patients"):
        patient_token = patient.get('token')
        patient_id = patient.get('id')
        
        if not patient_token:
            print(f"\nSkipping patient {patient_id} - no token")
            continue
        
        # Get patient appointments
        appointments = get_patient_appointments(patient_token)
        completed_appointments = [
            appt for appt in appointments 
            if appt.get('appointment_status') == 'Completed'
        ]
        
        if not completed_appointments:
            print(f"\nPatient {patient_id} has no completed appointments")
            continue
        
        print(f"\nPatient {patient_id} has {len(completed_appointments)} completed appointments")
        
        # Review each appointment
        for appt in tqdm(completed_appointments, desc="Creating reviews", leave=False):
            appt_id = appt['id']
            doctor_id = appt['doctor']['id']
            doctor_name = appt['doctor']['fullname']
            
            # Generate random rating (3.0-5.0 in 0.5 increments)
            rating = round(random.uniform(3.0, 5.0) * 2) / 2
            comment = generate_fake_review(rating, doctor_name)
            
            success = create_review(
                patient_token, 
                appt_id, 
                doctor_id, 
                doctor_name,
                rating, 
                comment
            )
            
            if not success:
                print(f"Failed to create review for appointment {appt_id}")
            
            # Add a small delay to avoid rate limiting
            sleep(0.3)

if __name__ == "__main__":
    main()