import requests
from io import BytesIO
import random
import json

API_BASE_URL = "http://localhost:1337"  # <-- Change this to your Strapi API base URL
DOCTORS_FILE = "patient_with_tokens.json"  # Your JSON file with doctor tokens

def get_random_doctor_image_url():
    gender = random.choice(["men", "women"])
    pic_id = random.randint(40, 99)
    return f"https://randomuser.me/api/portraits/{gender}/{pic_id}.jpg"

def update_profile_image(token, doctor_id):
    image_url = get_random_doctor_image_url()
    print(f"Downloading image for doctor ID {doctor_id} from {image_url}")

    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Timeout or error downloading image for doctor ID {doctor_id}: {e}")
        return False

    image_content = BytesIO(response.content)

    headers = {
        "Authorization": f"Bearer {token}",
    }

    files = {
        "files": ("profile.jpg", image_content, "image/jpeg"),
    }

    upload_url = f"{API_BASE_URL}/api/patient/img"

    try:
        upload_response = requests.post(upload_url, headers=headers, files=files, timeout=15)
        upload_response.raise_for_status()
    except requests.RequestException as e:
        print(f"Failed to upload image for doctor ID {doctor_id}: {e}")
        return False

    print(f"Profile picture updated successfully for doctor ID {doctor_id}!")
    return True

def main():
    # Load your doctors_with_tokens.json
    with open(DOCTORS_FILE, "r") as f:
        doctors = json.load(f)
        print(doctors)

    # Loop over each doctor and update profile image
    for doc in doctors:
        doctor_id = doc.get("id")
        token = doc.get("token")

        if not doctor_id or not token:
            print("Missing doctor ID or token, skipping...")
            continue

        print(f"Updating doctor ID: {doctor_id}")
        success = update_profile_image(token, doctor_id)
        if not success:
            print(f"Failed to update doctor ID {doctor_id}")

if __name__ == "__main__":
    main()
