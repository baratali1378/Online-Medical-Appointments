from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum


class UserType(str, Enum):
    DOCTOR = "doctor"
    PATIENT = "patient"


class MessageType(str, Enum):
    REMINDER = "reminder"
    ALERT = "alert"
    MESSAGE = "message"
    SYSTEM = "system"


class Notification(BaseModel):
    """Core notification model"""
    id: str = Field(..., description="Unique notification ID")
    user_type: UserType = Field(..., description="Recipient type (doctor/patient)")
    user_id: str = Field(..., description="Recipient user ID")
    message_type: MessageType = Field(..., description="Type of notification")
    title: str = Field(..., max_length=100, description="Notification title")
    content: str = Field(..., description="Notification content")
    timestamp: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")
    metadata: Optional[dict] = Field(None, description="Additional metadata")

    class Config:
        use_enum_values = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat()
        }
