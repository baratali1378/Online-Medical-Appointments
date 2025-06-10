class AppException(Exception):
    """Base exception class for the application"""
    pass


class ValidationError(AppException):
    """Raised when input validation fails"""
    pass


class UnauthorizedError(AppException):
    """Raised when authentication fails"""
    pass


class ForbiddenError(AppException):
    """Raised when authorization fails"""
    pass


class ConnectionError(AppException):
    """Raised for WebSocket connection issues"""
    pass


class MessageQueueError(AppException):
    """Raised for message queue related errors"""
    pass
