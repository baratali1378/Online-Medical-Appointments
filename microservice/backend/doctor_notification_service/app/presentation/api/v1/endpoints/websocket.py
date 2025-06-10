import asyncio
import json
from fastapi import WebSocket, WebSocketDisconnect, status, Depends, Request
from fastapi import APIRouter


from app.core.security import decode_token
from app.domain.websocket.socket_service import WebSocketService
from app.infrastructure.logging import get_logger

logger = get_logger(__name__)
router = APIRouter()


def get_websocket_service(request: Request) -> WebSocketService:
    return WebSocketService(
        websocket_manager=request.app.state.websocket_manager,
        notification_service=request.app.state.notification_service,
    )


@router.websocket("/ws/{user_type}")
async def websocket_endpoint(
        websocket: WebSocket,
        user_type: str,
        websocket_service: WebSocketService = Depends(get_websocket_service)
):
    """WebSocket endpoint for real-time notifications (receive-only)"""
    await websocket.accept()
    connection_id = None

    try:
        # Step 1: Validate user type
        await websocket_service.validate_user_type(user_type)

        # Step 2: Wait for initial authentication message (timeout after 5 seconds)
        try:
            data = await asyncio.wait_for(websocket.receive_text(), timeout=5.0)
            token_data = json.loads(data)
            token = token_data.get("token")
        except asyncio.TimeoutError:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION, reason="Authentication timeout")
            return
        except json.JSONDecodeError:
            await websocket.close(code=status.WS_1003_UNSUPPORTED_DATA, reason="Invalid JSON format")
            return
        except AttributeError:
            await websocket.close(code=status.WS_1003_UNSUPPORTED_DATA, reason="Token not provided")
            return

        # Step 3: Authenticate and authorize
        user_data = decode_token(token)
        await websocket_service.authorize(user_data, user_type)

        # Step 4: Register connection
        connection_id = await websocket_service.establish_connection(
            websocket,
            user_data["id"],
            user_type
        )

        # Step 5: Deliver pending notifications
        await websocket_service.handle_offline_notifications(
            user_data["id"],
            user_type
        )

        # Step 6: Keep connection open without expecting messages
        while True:
            # Just wait for disconnect (ping/pong handled automatically)
            await asyncio.sleep(1)  # Prevents busy waiting

    except WebSocketDisconnect:
        if connection_id:
            await websocket_service.handle_disconnect()
        return
    except Exception as error:
        logger.error(f"WebSocket error: {error}")
        await websocket.close(
            code=status.WS_1011_INTERNAL_ERROR,
            reason="Internal server error"
        )
