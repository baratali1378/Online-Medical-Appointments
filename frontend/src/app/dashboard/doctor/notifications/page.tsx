"use client";

import { useEffect, useRef, useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export default function NotificationSocket() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const wsRef = useRef<WebSocket | null>(null);

  const getAuthToken = () => {
    return localStorage.getItem("auth_token") || "";
  };

  const connectWebSocket = () => {
    const token = getAuthToken();
    const url = `ws://localhost:8000/api/v1/ws/patient`; // Adjust 'patient' to 'doctor' if needed

    const socket = new WebSocket(url);
    wsRef.current = socket;

    socket.onopen = () => {
      console.log("[WS] Connected");
      setConnectionStatus("connected");

      // Send token as the first message (JSON-encoded)
      socket.send(JSON.stringify({ token }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as Notification;
        console.log("[WS] Notification received:", data);
        setNotifications((prev) => [data, ...prev]);
      } catch (err) {
        console.error("[WS] Invalid message format:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("[WS] Error:", error);
      setConnectionStatus("error");
    };

    socket.onclose = (event) => {
      console.warn("[WS] Closed:", event.code, event.reason);
      setConnectionStatus("disconnected");

      // Attempt to reconnect after delay
      setTimeout(connectWebSocket, 5000);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close(1000, "Component unmounted");
      }
    };
  }, []);

  return (
    <div className="notification-container">
      <div className={`connection-status ${connectionStatus}`}>
        Status: {connectionStatus}
      </div>

      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications received yet</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
