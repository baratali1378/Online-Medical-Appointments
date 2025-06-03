import redis.asyncio as redis
import asyncio
import json
from datetime import datetime
from app.sockets import SocketManager
from app.models.schemas import ReminderMessage
import logging

logger = logging.getLogger(__name__)


class RedisListener:
    def __init__(self, socket_manager: SocketManager):
        self.socket_manager = socket_manager
        self.redis = redis.Redis(host="localhost", port=6379, decode_responses=True)

    async def listen(self):
        pubsub = self.redis.pubsub()
        await pubsub.subscribe("notifications")

        logger.info("Subscribed to Redis channel 'notifications'")

        async for message in pubsub.listen():
            if message["type"] == "message":
                try:
                    data = json.loads(message["data"])
                    await self.handle_notification(data)
                except Exception as e:
                    logger.error(f"Failed to handle notification: {e}")

    async def handle_notification(self, data: dict):
        reminder = ReminderMessage(
            id=data["id"],
            userType=data["userType"],
            userId=int(data["userId"]),
            message=data["message"],
            timestamp=datetime.utcnow().isoformat(),
        )
        user_id_str = str(reminder.userId)

        logger.info(f"Received notification for {reminder.userType} {user_id_str}: {reminder.message}")

        # Send notification to connected user if online
        if reminder.userType == "doctor":
            await self.socket_manager.send_to_doctor(reminder.dict(), user_id_str)
        elif reminder.userType == "patient":
            await self.socket_manager.send_to_patient(reminder.dict(), user_id_str)
        else:
            logger.warning(f"Unknown userType in notification: {reminder.userType}")
