// hooks/useDoctorPatients.ts
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorPatients } from "@/service/patientService";

export const useDoctorPatients = (token: string) => {
  return useQuery({
    queryKey: ["doctorPatients"],
    queryFn: () => fetchDoctorPatients(token),
    enabled: !!token, // fetch only if token is provided
  });
};
