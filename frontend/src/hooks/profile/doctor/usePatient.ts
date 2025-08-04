// hooks/useDoctorPatients.ts
import { useQuery } from "@tanstack/react-query";
import {
  fetchDoctorPatients,
  fetchPatientById,
} from "@/service/patientService";

export const useDoctorPatients = (token: string) => {
  return useQuery({
    queryKey: ["doctorPatients"],
    queryFn: () => fetchDoctorPatients(token),
    enabled: !!token, // fetch only if token is provided
  });
};

export const useDoctorPatient = (token: string, patientId: number | string) => {
  return useQuery({
    queryKey: ["doctorPatient"],
    queryFn: () => fetchPatientById(token, patientId),
    enabled: !!token, // fetch only if token is provided
  });
};
