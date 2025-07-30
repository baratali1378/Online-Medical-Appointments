import { createApiClient, getWithFilters, putData } from "@/lib/strapiClient";
import {
  PatientAppointmentsResponse,
  AppointmentFilters,
} from "@/types/appointments";

export const getPatientAppointments = (
  filters: AppointmentFilters,
  token: string
) => {
  const client = createApiClient(token);
  return getWithFilters<PatientAppointmentsResponse>(
    client,
    "api/appointments/patient",
    filters
  );
};

export const changePatientAppointmentStatus = (
  id: number | string,
  status: string,
  token: string,
  date?: string,
  available_slot?: number | string
) => {
  const client = createApiClient(token);
  const updates: any = { appointment_status: status };

  if (date) updates.date = date;
  if (available_slot) updates.available_slot = available_slot;

  return putData(client, `api/appointments/${id}`, { data: updates });
};
