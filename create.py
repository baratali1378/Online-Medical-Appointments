import requests
import io
import random
import uuid

BASE_URL_MEN = "https://randomuser.me/api/portraits/men/"
BASE_URL_WOMEN = "https://randomuser.me/api/portraits/women/"

STRAPI_URL = "http://localhost:1337"
TOKENS_FILE = "doctor_tokens.txt"

def get_random_image_url():
    gender = random.choice(['men', 'women'])
    number = random.randint(0, 99)
    if gender == 'men':
        return f"{BASE_URL_MEN}{number}.jpg"
    else:
        return f"{BASE_URL_WOMEN}{number}.jpg"

def download_image(url):
    print(f"Downloading image from {url}...")
    resp = requests.get(url)
    resp.raise_for_status()
    return resp.content

def update_doctor_image(token, image_bytes):
    url = f"{STRAPI_URL}/api/doctor/img"
    headers = {
        "Authorization": f"Bearer {token}",
    }

    # Generate unique filename with uuid4
    unique_filename = f"profile_{uuid.uuid4().hex}.jpg"

    file_obj = io.BytesIO(image_bytes)
    file_obj.name = unique_filename

    files = {
        "files": (file_obj.name, file_obj, "image/jpeg"),
    }

    print(f"Uploading image for token: {token[:8]} with filename {file_obj.name}...")
    response = requests.post(url, headers=headers, files=files)
    if response.status_code == 200:
        print(f"Success: {response.json()}")
    else:
        print(f"Failed ({response.status_code}): {response.text}")

def main():
    with open(TOKENS_FILE, "r") as f:
        tokens = [line.strip() for line in f if line.strip()]

    for token in tokens:
        try:
            image_url = get_random_image_url()
            image_bytes = download_image(image_url)
            update_doctor_image(token, image_bytes)
        except Exception as e:
            print(f"Error for token {token[:8]}: {e}")

if __name__ == "__main__":
    main()
