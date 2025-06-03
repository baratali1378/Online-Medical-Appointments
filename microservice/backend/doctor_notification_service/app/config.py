from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()  # ensures .env is loaded


class Settings(BaseSettings):
    strapi_url: str = "http://localhost:1337"
    strapi_token: str
    websocket_port: int = 8000
    check_interval_minutes: int = 5
    reminder_window_hours: int = 1
    jwt_secret: str

    class Config:
        env_file = ".env"
        case_sensitive = False  # optional if you're using uppercase keys


settings = Settings()
