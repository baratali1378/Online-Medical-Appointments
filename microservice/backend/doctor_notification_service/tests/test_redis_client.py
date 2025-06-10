# tests/test_redis_client.py
import pytest
import asyncio
from app.infrastructure.message_brokers.radis import RedisClient
from app.config.settings import settings


@pytest.mark.asyncio
async def test_store_get_clear_messages():
    redis_client = RedisClient()
    key = "test:messages"
    message = {"user_id": 123, "content": "test message"}

    await redis_client.store_message(key, message)
    stored_messages = await redis_client.get_messages(key)

    assert len(stored_messages) == 1
    assert stored_messages[0]["user_id"] == 123

    await redis_client.clear_messages(key)
    cleared = await redis_client.get_messages(key)
    assert cleared == []
