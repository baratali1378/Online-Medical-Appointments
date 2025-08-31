// hooks/useDoctorSearchQuery.ts
import { useQuery } from "@tanstack/react-query";
import { searchDoctors } from "@/service/searchService";
import { DoctorSearchResult } from "@/types/search";

export function useDoctorSearchQuery(params?: {
  city?: string;
  specialty?: string;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
  minRating?: number | string;
  verified?: boolean;
}) {
  return useQuery<DoctorSearchResult, Error>({
    queryKey: ["doctorSearch", params], // cache per filter set
    queryFn: () => searchDoctors(params),
    staleTime: 1000 * 60, // 1 min caching
  });
}
