import { useQuery } from "@tanstack/react-query";
import { DoctorAutocompleteResult } from "@/types/doctor";
import { fetchDoctorSuggestions } from "@/service/autoComplete";

export function useDoctorAutocomplete(query: string) {
  return useQuery<DoctorAutocompleteResult[], Error>({
    queryKey: ["doctor-autocomplete", query],
    queryFn: () => fetchDoctorSuggestions(query),
    enabled: query.length >= 3, // Only run when query has 3+ chars
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
