import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from app.config.settings import settings
from app.core.exceptions import UnauthorizedError


def create_access_token(user_id: str, role: str) -> str:
    """Create JWT token for user authentication"""
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    """Decode and verify JWT token"""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return {
            "id": payload["sub"],
            "role": payload["role"]
        }
    except jwt.ExpiredSignatureError:
        raise UnauthorizedError("Token has expired")
    except jwt.InvalidTokenError:
        raise UnauthorizedError("Invalid token")
    except Exception as error:
        raise UnauthorizedError(f"Token verification failed: {str(error)}")
