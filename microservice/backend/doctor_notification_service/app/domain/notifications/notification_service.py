from app.domain.notifications.models import Notification
from app.domain.websocket.manager import WebSocketConnectionManager
from app.infrastructure.message_brokers.radis import RedisClient
from app.infrastructure.logging import get_logger

logger = get_logger(__name__)


class NotificationService:
    """Handles notification delivery and offline storage"""

    def __init__(
            self,
            websocket_manager: WebSocketConnectionManager,
            redis_client: RedisClient
    ):
        self.websocket_manager = websocket_manager
        self.redis_client = redis_client

    async def send_notification(self, notification: Notification) -> bool:
        """Attempt to send notification via WebSocket or store offline"""
        connection_id = f"{notification.user_type}_{notification.user_id}"

        # Try real-time delivery first
        if await self._try_realtime_delivery(notification, connection_id):
            return True

        # Fall back to offline storage
        await self._store_offline_notification(notification)
        return False

    async def _try_realtime_delivery(
            self,
            notification: Notification,
            connection_id: str
    ) -> bool:
        """Attempt to deliver notification via WebSocket"""
        success = await self.websocket_manager.send_message(
            notification.dict(),
            connection_id
        )
        if success:
            logger.info(
                "Notification delivered in real-time",
                extra={
                    "notification_id": notification.id,
                    "user_type": notification.user_type,
                    "user_id": notification.user_id
                }
            )
        return success

    async def _store_offline_notification(self, notification: Notification) -> None:
        """Store notification for offline user"""
        key = f"offline_{notification.user_type}_{notification.user_id}"
        message = notification.dict()

        logger.debug("Attempting to store message in Redis", extra={
            "key": key,
            "message_type": str(type(message)),
        })

        await self.redis_client.store_message(key, message)

        logger.info(
            "Notification stored offline",
            extra={
                "notification_id": notification.id,
                "user_type": notification.user_type,
                "user_id": notification.user_id
            }
        )

    async def deliver_offline_notifications(
            self,
            user_id: str,
            user_type: str
    ) -> int:
        """Deliver any pending notifications when user reconnects"""
        key = f"offline_{user_type}_{user_id}"
        messages = await self.redis_client.get_messages(key)

        if not messages:
            return 0

        connection_id = f"{user_type}_{user_id}"
        delivered_count = 0

        for message in messages:
            if await self.websocket_manager.send_message(message, connection_id):
                delivered_count += 1

        if delivered_count > 0:
            await self.redis_client.clear_messages(key)
            logger.info(
                "Delivered offline notifications",
                extra={
                    "user_type": user_type,
                    "user_id": user_id,
                    "count": delivered_count
                }
            )

        return delivered_count
