import json
from typing import List
import redis.asyncio as redis
from app.config.settings import settings
from app.infrastructure.logging import get_logger
from app.core.exceptions import MessageQueueError
import datetime

logger = get_logger(__name__)


class RedisClient:
    """Redis client for offline message storage"""

    def __init__(self):
        self.client = redis.Redis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT,
            db=settings.REDIS_DB,
            decode_responses=True
        )

    def json_serial(self, obj):
        if isinstance(obj, (datetime.datetime, datetime.date)):
            return obj.isoformat()
        raise TypeError(f"Type {type(obj)} not serializable")

    async def store_message(self, key: str, message: dict) -> None:
        """Store message in Redis list with TTL"""
        try:
            await self.client.rpush(key, json.dumps(message, default=self.json_serial))
            await self.client.expire(key, settings.REDIS_OFFLINE_TTL)
            logger.debug(
                "Message stored in Redis",
                extra={"key": key}
            )
        except Exception as error:
            logger.error(
                "Failed to store message in Redis",
                extra={"key": key, "error": str(error)}
            )
            raise MessageQueueError("Redis storage failed") from error

    async def get_messages(self, key: str) -> List[dict]:
        """Retrieve all messages from Redis list"""
        try:
            messages = await self.client.lrange(key, 0, -1)
            if messages:
                logger.debug(
                    "Retrieved messages from Redis",
                    extra={"key": key, "count": len(messages)}
                )
                return [json.loads(msg) for msg in messages]
            return []
        except Exception as error:
            logger.error(
                "Failed to get messages from Redis",
                extra={"key": key, "error": str(error)}
            )
            raise MessageQueueError("Redis retrieval failed") from error

    async def clear_messages(self, key: str) -> None:
        """Remove all messages from Redis list"""
        try:
            await self.client.delete(key)
            logger.debug("Cleared messages from Redis", extra={"key": key})
        except Exception as error:
            logger.error(
                "Failed to clear Redis messages",
                extra={"key": key, "error": str(error)}
            )
            raise MessageQueueError("Redis cleanup failed") from error
