import { useQuery } from "@tanstack/react-query";
import { getPatientAppointments } from "@/service/profile/patient/appointmentService";
import {
  AppointmentFilters,
  PatientAppointmentsResponse,
} from "@/types/appointments";

interface UsePatientAppointmentsQueryOptions {
  token: string;
  filters?: AppointmentFilters;
  enabled?: boolean;
}

export const usePatientAppointmentsQuery = ({
  token,
  filters = {},
  enabled = true,
}: UsePatientAppointmentsQueryOptions) => {
  return useQuery<PatientAppointmentsResponse, Error>({
    queryKey: ["patientAppointments", filters],
    queryFn: () => getPatientAppointments(filters, token),
    enabled: !!token && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
