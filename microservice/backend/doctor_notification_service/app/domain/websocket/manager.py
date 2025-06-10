import logging
from typing import Dict, Optional
from fastapi import WebSocket
from app.infrastructure.logging import get_logger

logger = get_logger(__name__)


class WebSocketConnectionManager:
    """Manages active WebSocket connections"""

    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, connection_id: str) -> None:
        """Accept new WebSocket connection and track it"""
        await websocket.accept()
        self.active_connections[connection_id] = websocket
        logger.info("WebSocket connected", extra={"connection_id": connection_id})

    def disconnect(self, connection_id: str) -> None:
        """Remove WebSocket connection from tracking"""
        if connection_id in self.active_connections:
            del self.active_connections[connection_id]
            logger.info("WebSocket disconnected", extra={"connection_id": connection_id})

    async def send_message(self, message: dict, connection_id: str) -> bool:
        """Send message to specific WebSocket connection"""
        websocket = self.active_connections.get(connection_id)
        if not websocket:
            logger.warning("Connection not found", extra={"connection_id": connection_id})
            return False

        try:
            await websocket.send_json(message)
            logger.debug("Message sent successfully", extra={"connection_id": connection_id})
            return True
        except Exception as error:
            logger.error(
                "Failed to send message",
                extra={
                    "connection_id": connection_id,
                    "error": str(error)
                }
            )
            self.disconnect(connection_id)
            return False

    async def broadcast(self, message: dict, prefix: Optional[str] = None) -> None:
        """Send message to all matching WebSocket connections"""
        for connection_id, websocket in self.active_connections.items():
            if prefix and not connection_id.startswith(prefix):
                continue

            try:
                await websocket.send_json(message)
                logger.debug(
                    "Broadcast message sent",
                    extra={"connection_id": connection_id}
                )
            except Exception as error:
                logger.error(
                    "Broadcast failed",
                    extra={
                        "connection_id": connection_id,
                        "error": str(error)
                    }
                )
                self.disconnect(connection_id)