import axios from "axios";
import { AppointmentsResponse, AppointmentFilters } from "@/types/appointments";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getDoctorAppointments = async (
  filters: AppointmentFilters = {},
  token: string
): Promise<AppointmentsResponse> => {
  const params: Record<string, any> = {};

  if (filters.status && filters.status !== "All") {
    params.status = filters.status;
  }

  if (filters.dateRange) {
    params.startDate = filters.dateRange.start;
    params.endDate = filters.dateRange.end;
  }

  if (filters.search) {
    params.search = filters.search;
  }

  try {
    const response = await axios.get<AppointmentsResponse>(
      `${API_URL}/api/appointments/doctor`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch doctor appointments:", error);
    throw {
      message: error.response?.data?.message || "Failed to fetch appointments.",
      status: error.response?.status || 500,
    };
  }
};

// ✅ Method to update appointment status with error handling
export const changeAppointmentStatus = async (
  id: number | string,
  status: string,
  token: string
): Promise<any> => {
  try {
    const response = await axios.put(
      `${API_URL}/api/appointments/doctor`,
      { id, status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw {
      message:
        error.response?.data?.error?.message ||
        "Could not update appointment status.",
      status: error.response?.status || 500,
    };
  }
};
