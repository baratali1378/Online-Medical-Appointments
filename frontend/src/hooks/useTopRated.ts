import { useQuery } from "@tanstack/react-query";
import { DoctorListItem } from "@/types/doctor";
import { getDoctorList } from "@/service/doctorService";

export function useDoctorListQuery() {
  return useQuery<DoctorListItem[], Error>({
    queryKey: ["doctors"],
    queryFn: getDoctorList,
  });
}
