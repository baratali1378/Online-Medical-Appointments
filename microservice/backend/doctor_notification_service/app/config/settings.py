from pydantic import BaseSettings
import os


class Settings(BaseSettings):
    # Application
    APP_NAME: str = "Notification Service"
    DEBUG: bool = False
    ENVIRONMENT: str = "development"

    # Security
   # JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 30

    # WebSocket
    WEBSOCKET_PORT: int = 8000
    WEBSOCKET_PING_INTERVAL: int = 30
    WEBSOCKET_PING_TIMEOUT: int = 30

    # RabbitMQ
    RABBITMQ_HOST: str = "localhost"
    RABBITMQ_PORT: int = 5672
    RABBITMQ_USER: str = "guest"
    RABBITMQ_PASSWORD: str = "guest"
    RABBITMQ_QUEUE: str = "notifications"
    RABBITMQ_PREFETCH_COUNT: int = 10

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_OFFLINE_TTL: int = 86400  # 24 hours

    class Config:
        env_file = os.getenv("ENV_FILE", ".env.test" if "PYTEST_CURRENT_TEST" in os.environ else ".env")
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()
