import logging
from fastapi import WebSocket
from typing import Dict


class SocketManager:
    def __init__(self):
        self.doctor_connections: Dict[str, WebSocket] = {}
        self.patient_connections: Dict[str, WebSocket] = {}
        self.logger = logging.getLogger(__name__)

    async def connect_doctor(self, websocket: WebSocket, doctor_id: str):
        await websocket.accept()
        self.doctor_connections[doctor_id] = websocket
        self.logger.info(f"Doctor {doctor_id} connected")

    async def connect_patient(self, websocket: WebSocket, patient_id: str):
        await websocket.accept()
        self.patient_connections[patient_id] = websocket
        self.logger.info(f"Patient {patient_id} connected")

    def disconnect_doctor(self, doctor_id: str):
        if doctor_id in self.doctor_connections:
            del self.doctor_connections[doctor_id]
            self.logger.info(f"Doctor {doctor_id} disconnected")

    def disconnect_patient(self, patient_id: str):
        if patient_id in self.patient_connections:
            del self.patient_connections[patient_id]
            self.logger.info(f"Patient {patient_id} disconnected")

    async def send_to_doctor(self, message: dict, doctor_id: str):
        websocket = self.doctor_connections.get(doctor_id)
        if websocket:
            try:
                await websocket.send_json(message)
            except Exception as e:
                self.logger.error(f"Error sending to doctor {doctor_id}: {e}")
                self.disconnect_doctor(doctor_id)

    async def send_to_patient(self, message: dict, patient_id: str):
        websocket = self.patient_connections.get(patient_id)
        if websocket:
            try:
                await websocket.send_json(message)
            except Exception as e:
                self.logger.error(f"Error sending to patient {patient_id}: {e}")
                self.disconnect_patient(patient_id)
