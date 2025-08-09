import { useQuery } from "@tanstack/react-query";
import { getDoctorList } from "@/service/topRateDoctor";
import { DoctorListItem } from "@/types/doctor";

export function useDoctorListQuery() {
  return useQuery<DoctorListItem[], Error>({
    queryKey: ["doctors"],
    queryFn: getDoctorList,
  });
}
