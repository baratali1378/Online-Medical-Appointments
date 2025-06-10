import aio_pika
import json
import asyncio
from typing import Callable, Awaitable
from app.config.settings import settings
from app.infrastructure.logging import get_logger
from app.domain.notifications.models import Notification
from app.core.exceptions import MessageQueueError

logger = get_logger(__name__)


class RabbitMQConsumer:
    """RabbitMQ message consumer with reconnection logic"""

    def __init__(self, message_handler: Callable[[Notification], Awaitable[None]]):
        self.settings = settings
        self.message_handler = message_handler
        self.connection = None
        self.channel = None
        self.queue = None
        self._should_reconnect = True
        self._reconnect_delay = 5

    async def connect(self) -> None:
        """Establish connection to RabbitMQ"""
        try:
            self.connection = await aio_pika.connect_robust(
                f"amqp://{self.settings.RABBITMQ_USER}:{self.settings.RABBITMQ_PASSWORD}@"
                f"{self.settings.RABBITMQ_HOST}:{self.settings.RABBITMQ_PORT}/"
            )
            self.channel = await self.connection.channel()
            await self.channel.set_qos(prefetch_count=self.settings.RABBITMQ_PREFETCH_COUNT)
            self.queue = await self.channel.declare_queue(
                self.settings.RABBITMQ_QUEUE,
                durable=True
            )
            logger.info("RabbitMQ connection established")
        except Exception as error:
            logger.error(
                "Failed to connect to RabbitMQ",
                extra={"error": str(error)}
            )
            raise MessageQueueError("RabbitMQ connection failed") from error

    async def consume(self) -> None:
        """Start consuming messages from queue"""
        try:
            async with self.queue.iterator() as queue_iter:
                async for message in queue_iter:
                    async with message.process():
                        try:
                            raw_body = message.body.decode()
                            logger.debug("Raw message body: %s", raw_body)
                            notification = Notification(**json.loads(raw_body))
                            await self.message_handler(notification)
                        except Exception as error:
                            logger.error(
                                "Message processing failed:",
                                extra={"error_detail": str(error)}
                            )
        except Exception as error:
            logger.error(
                "RabbitMQ consumption error",
                extra={"error_detail": str(error)}
            )
            raise MessageQueueError("Message consumption failed") from error

    async def run(self) -> None:
        """Run consumer with reconnection handling"""
        while self._should_reconnect:
            try:
                await self.connect()
                await self.consume()
            except MessageQueueError:
                if not self._should_reconnect:
                    break
                logger.warning(
                    f"Reconnecting in {self._reconnect_delay} seconds..."
                )
                await asyncio.sleep(self._reconnect_delay)
            finally:
                if self.connection and not self.connection.is_closed:
                    await self.connection.close()

    async def stop(self) -> None:
        """Gracefully stop the consumer"""
        self._should_reconnect = False
        if self.connection and not self.connection.is_closed:
            await self.connection.close()
