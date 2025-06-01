// hooks/useDoctorReviews.ts
import { useQuery } from "@tanstack/react-query";
import { ReviewService } from "@/service/profile/doctor/reviewService";

export const useDoctorReviews = (token: string) => {
  return useQuery({
    queryKey: ["doctorReviews"],
    queryFn: () => ReviewService.getDoctorReviews(token),
    enabled: !!token, // Only fetch if token exists
  });
};
