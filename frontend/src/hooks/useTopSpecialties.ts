import { useQuery } from "@tanstack/react-query";
import { getTopSpecialties } from "@/service/specialty";
import { TopSpecialty } from "@/types/specialty";

export function useTopSpecialties(limit: number = 5) {
  return useQuery<TopSpecialty[], Error>({
    queryKey: ["topSpecialties", limit],
    queryFn: () => getTopSpecialties(limit),
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
