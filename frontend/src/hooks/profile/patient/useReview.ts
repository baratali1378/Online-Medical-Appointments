import { useMutation } from "@tanstack/react-query";
import { createPatientReview } from "@/service/profile/patient/reviewService";
import { toast } from "react-toastify";
import { CreateReviewRequest, CreateReviewResponse } from "@/types/review";

export const useCreatePatientReview = (token: string) => {
  return useMutation<CreateReviewResponse, any, CreateReviewRequest>({
    mutationFn: (reviewData) => createPatientReview(reviewData, token),

    onSuccess: () => {
      toast.success("Review submitted successfully!");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });
};
