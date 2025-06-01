import { handleServiceError } from "@/lib/error";
import { createApiClient } from "@/lib/strapiClient";

import { ReviewResponse } from "@/types/review";

export const ReviewService = {
  async getDoctorReviews(token: string): Promise<ReviewResponse> {
    try {
      const api = createApiClient(token);
      const response = await api.get<ReviewResponse>("/api/doctor/reviews");
      return response.data;
    } catch (error) {
      throw handleServiceError(error, "Failed to fetch doctor reviews");
    }
  },
};
