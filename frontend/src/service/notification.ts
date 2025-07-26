import axios from "axios";
import {
  NotificationsResponse,
  NotificationFilters,
} from "@/types/notification";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// Helper to build URL based on user type
const getBasePath = (userType: "doctor" | "patient") => {
  return userType === "doctor"
    ? "/api/notifications/doctor"
    : "/api/notifications/patient";
};

// ✅ Get notifications (doctor or patient)
export const getNotifications = async (
  userType: "doctor" | "patient",
  token: string,
  filters: NotificationFilters = {}
): Promise<NotificationsResponse> => {
  try {
    const response = await axios.get<NotificationsResponse>(
      `${API_URL}${getBasePath(userType)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: filters.search || undefined,
          filter: filters.filter || undefined,
          page: filters.page || 1,
          pageSize: filters.pageSize || 10,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw {
      message: "Failed to fetch notifications.",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Mark one as read
export const markNotificationRead = async (
  userType: "doctor" | "patient",
  id: number,
  token: string
): Promise<void> => {
  try {
    await axios.put(
      `${API_URL}/api/notifications/${userType}/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    throw {
      message: "Failed to mark notification as read.",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Mark all as read
export const markAllNotificationsRead = async (
  userType: "doctor" | "patient",
  token: string
): Promise<void> => {
  try {
    await axios.put(
      `${API_URL}/api/notifications/${userType}/read-all`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    throw {
      message: "Failed to mark all notifications as read.",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Delete notification
export const deleteNotification = async (
  userType: "doctor" | "patient",
  id: number,
  token: string
): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/notifications/${userType}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw {
      message: "Failed to delete notification.",
      status: error.response?.status || 500,
    };
  }
};
