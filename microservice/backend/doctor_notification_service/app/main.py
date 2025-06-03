from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
import uvicorn
import logging
from app.sockets import SocketManager
from app.services.redis_listener import RedisListener
from app.utils.auth import decode_token  # Your JWT auth decoder
from app.config import settings
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
socket_manager = SocketManager()
redis_listener = RedisListener(socket_manager)


@app.on_event("startup")
async def startup_event():
    # Start Redis listener in background
    asyncio.create_task(redis_listener.listen())
    logger.info("Redis listener started")


@app.websocket("/ws/doctor")
async def websocket_doctor(websocket: WebSocket):
    await websocket.accept()
    try:
        auth = await websocket.receive_json()
        token = auth.get("token")
        user = decode_token(token)
        if user["role"] != "doctor":
            raise HTTPException(status_code=403, detail="Not authorized")
        doctor_id = str(user["id"])
        await socket_manager.connect_doctor(websocket, doctor_id)
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        socket_manager.disconnect_doctor(doctor_id)
        logger.info(f"Doctor {doctor_id} disconnected")
    except Exception as e:
        logger.error(f"WebSocket doctor error: {e}")
        await websocket.close()


@app.websocket("/ws/patient")
async def websocket_patient(websocket: WebSocket):
    await websocket.accept()
    try:
        auth = await websocket.receive_json()
        token = auth.get("token")
        user = decode_token(token)
        if user["role"] != "patient":
            raise HTTPException(status_code=403, detail="Not authorized")
        id_ = str(user["id"])
        await socket_manager.connect_patient(websocket,id_)
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        socket_manager.disconnect_patient(id_)
        logger.info(f"Patient {id_} disconnected")
    except Exception as e:
        logger.error(f"WebSocket patient error: {e}")
        await websocket.close()


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.websocket_port, reload=True)
