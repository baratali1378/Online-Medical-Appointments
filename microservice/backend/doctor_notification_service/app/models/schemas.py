from pydantic import BaseModel


class ReminderMessage(BaseModel):
    id: int
    userType: str  # "doctor" or "patient"
    userId: int
    message: str
    timestamp: str
