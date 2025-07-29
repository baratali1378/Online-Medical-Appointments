import { createApiClient, getWithFilters, putData } from "@/lib/strapiClient";
import {
  DoctorAppointmentsResponse,
  DoctorAppointmentFilters,
} from "@/types/appointments";

export const getDoctorAppointments = (
  filters: DoctorAppointmentFilters,
  token: string
) => {
  const client = createApiClient(token);
  return getWithFilters<DoctorAppointmentsResponse>(
    client,
    "api/appointments/doctor",
    filters
  );
};

export const changeAppointmentStatus = (
  id: number | string,
  status: string,
  token: string
) => {
  const client = createApiClient(token);
  return putData(client, "api/appointments/doctor", { id, status });
};
