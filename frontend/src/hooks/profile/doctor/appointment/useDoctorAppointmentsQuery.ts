// hooks/useDoctorAppointmentsQuery.ts
import { useQuery } from "@tanstack/react-query";
import { getDoctorAppointments } from "@/service/profile/doctor/appointment";
import {
  AppointmentFilters,
  DoctorAppointmentsResponse,
} from "@/types/appointments";

interface UseDoctorAppointmentsQueryOptions {
  token: string;
  filters?: AppointmentFilters;
  enabled?: boolean;
}

export const useDoctorAppointmentsQuery = ({
  token,
  filters = {},
  enabled = true,
}: UseDoctorAppointmentsQueryOptions) => {
  return useQuery<DoctorAppointmentsResponse, Error>({
    queryKey: ["doctorAppointments", filters],
    queryFn: () => getDoctorAppointments(filters, token),
    enabled: !!token && enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
