from typing import Optional
from fastapi import WebSocket
from app.core.exceptions import (
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    ConnectionError
)
from app.core.security import decode_token
from app.domain.notifications.notification_service import NotificationService
from app.domain.websocket.manager import WebSocketConnectionManager
from app.infrastructure.logging import get_logger

logger = get_logger(__name__)


class WebSocketService:
    """Handles WebSocket connection lifecycle and authentication"""

    def __init__(
            self,
            websocket_manager: WebSocketConnectionManager,
            notification_service: NotificationService
    ):
        self.manager = websocket_manager
        self.notification_service = notification_service
        self.connection_id: Optional[str] = None

    async def validate_user_type(self, user_type: str) -> None:
        """Validate the user type parameter"""
        if user_type not in ["doctor", "patient"]:
            raise ValidationError("Invalid user type. Must be 'doctor' or 'patient'")

    async def authenticate(self, websocket: WebSocket) -> str:
        """Authenticate WebSocket connection with JWT token"""
        try:
            auth_data = await websocket.receive_json()
            if not (token := auth_data.get("token")):
                raise UnauthorizedError("Authentication token is required")
            return token
        except Exception as error:
            raise ConnectionError("Failed to receive authentication data") from error

    async def authorize(self, user_data: dict, user_type: str) -> None:
        """Authorize user based on their role"""
        if user_data.get("role") != user_type:
            raise ForbiddenError(f"User is not authorized as {user_type}")

    async def establish_connection(
            self,
            websocket: WebSocket,
            user_id: str,
            user_type: str
    ) -> str:
        """Establish and track WebSocket connection"""
        self.connection_id = f"{user_type}_{user_id}"
        await self.manager.connect(websocket, self.connection_id)
        return self.connection_id

    async def handle_offline_notifications(
            self,
            user_id: str,
            user_type: str
    ) -> None:
        """Check and deliver any pending offline notifications"""
        delivered = await self.notification_service.deliver_offline_notifications(
            user_id,
            user_type
        )
        if delivered > 0:
            logger.info(
                f"Delivered {delivered} offline notifications",
                extra={
                    "user_type": user_type,
                    "user_id": user_id
                }
            )

    async def maintain_connection(self, websocket: WebSocket) -> None:
        """Keep connection alive and handle incoming messages"""
        while True:
            try:
                # We just need to keep the connection open
                await websocket.receive_text()
            except Exception as error:
                raise ConnectionError("WebSocket connection lost") from error

    async def handle_disconnect(self) -> None:
        """Clean up on WebSocket disconnect"""
        if self.connection_id:
            self.manager.disconnect(self.connection_id)
            self.connection_id = None
