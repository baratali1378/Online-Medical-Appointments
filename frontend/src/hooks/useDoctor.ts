import { useQuery } from "@tanstack/react-query";
import { getDoctor } from "@/service/doctorService";
import { DoctorDetailsResponse } from "@/types/doctor";

export function useDoctor(doctorId: number | string) {
  return useQuery<DoctorDetailsResponse, Error>({
    queryKey: ["doctor", doctorId],
    queryFn: () => getDoctor(doctorId),
    enabled: Boolean(doctorId), // only run when doctorId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
