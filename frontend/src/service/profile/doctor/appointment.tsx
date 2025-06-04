// services/appointments.ts
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
};

// NEW method to update appointment status
export const changeAppointmentStatus = async (
  id: number | string,
  status: string,
  token: string
): Promise<any> => {
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
};
