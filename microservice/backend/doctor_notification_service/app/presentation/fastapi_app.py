from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
import asyncio
from app.config.settings import settings
from app.infrastructure.logging import configure_logging
from app.presentation.api.v1.endpoints.websocket import router as websocket_router
from app.domain.notifications.notification_service import NotificationService
from app.domain.websocket.manager import WebSocketConnectionManager
from app.infrastructure.message_brokers.radis import RedisClient
from app.infrastructure.message_brokers.rabbitmq import RabbitMQConsumer


def create_application() -> FastAPI:
    """Create and configure FastAPI application"""

    # Configure logging
    configure_logging()

    # Initialize application
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG
    )

    # Setup CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(
        websocket_router,
        prefix="/api/v1"
    )

    # Initialize services
    websocket_manager = WebSocketConnectionManager()
    redis_client = RedisClient()
    notification_service = NotificationService(websocket_manager, redis_client)

    # Dependency injection
    app.state.websocket_manager = websocket_manager
    app.state.notification_service = notification_service

    @app.get("/")
    async def home():
        return "hello"

    # Startup events
    @app.on_event("startup")
    async def startup_event():
        """Initialize RabbitMQ consumer on startup"""
        rabbitmq_consumer = RabbitMQConsumer(notification_service.send_notification)
        asyncio.create_task(rabbitmq_consumer.run())
        logging.info("Notification service started")

    # Shutdown events
    @app.on_event("shutdown")
    async def shutdown_event():
        """Cleanup resources on shutdown"""
        logging.info("Notification service shutting down")

    return app


app = create_application()
