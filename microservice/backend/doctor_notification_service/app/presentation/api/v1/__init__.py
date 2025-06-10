# app/presentation/api/v1/__init__.py
"""API version 1 routes"""

from fastapi import APIRouter
from .endpoints.websocket import router as websocket_router

router = APIRouter()
router.include_router(websocket_router, prefix="/ws", tags=["websocket"])

__all__ = ["router"]