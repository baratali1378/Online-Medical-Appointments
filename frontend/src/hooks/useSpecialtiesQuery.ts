import { useQuery } from "@tanstack/react-query";
import { getSpecialties } from "@/service/specialty";
import { Specialty } from "@/types/specialty";

export function useSpecialtiesQuery() {
  return useQuery<Specialty[], Error>({
    queryKey: ["specialties"],
    queryFn: getSpecialties,
  });
}
