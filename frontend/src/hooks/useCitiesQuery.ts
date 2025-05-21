import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/service/cityService";
import { City } from "@/types/city";

export function useCitiesQuery() {
  return useQuery<City[], Error>({
    queryKey: ["cities"],
    queryFn: getCities,
  });
}
