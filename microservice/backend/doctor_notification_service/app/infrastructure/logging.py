import logging
import sys
import json
from typing import Dict, Any
from app.config.settings import settings


class JSONFormatter(logging.Formatter):
    """Structured JSON log formatter with support for `extra` fields."""

    def format(self, record: logging.LogRecord) -> str:
        log_record: Dict[str, Any] = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "message": record.getMessage(),
            "logger": record.name,
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }

        # Add custom fields passed via `extra`
        standard_keys = {
            'name', 'msg', 'args', 'levelname', 'levelno', 'pathname', 'filename',
            'module', 'exc_info', 'exc_text', 'stack_info', 'lineno', 'funcName',
            'created', 'msecs', 'relativeCreated', 'thread', 'threadName',
            'processName', 'process', 'message'  # Added here
        }

        for key, value in record.__dict__.items():
            if key not in standard_keys and key not in log_record:
                log_record[key] = value

        return json.dumps(log_record, ensure_ascii=False)


def get_logger(name: str) -> logging.Logger:
    """Get logger with correct level."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG if settings.DEBUG else logging.INFO)
    return logger


def configure_logging() -> None:
    """Configure structured logging for the entire app."""

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(JSONFormatter())

    root_logger = logging.getLogger()
    root_logger.handlers = [handler]
    root_logger.setLevel(logging.DEBUG if settings.DEBUG else logging.INFO)

    # Quiet down noisy third-party libraries
    logging.getLogger("aio_pika").setLevel(logging.WARNING)
    logging.getLogger("aiormq").setLevel(logging.WARNING)
    logging.getLogger("asyncio").setLevel(logging.WARNING)
