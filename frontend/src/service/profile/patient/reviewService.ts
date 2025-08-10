import { createApiClient } from "@/lib/strapiClient";
import { CreateReviewRequest, CreateReviewResponse } from "@/types/review";

/**
 * Create a review for a completed appointment.
 * Requires patient authentication token.
 */
export const createPatientReview = async (
  reviewData: CreateReviewRequest,
  token: string
): Promise<CreateReviewResponse> => {
  const client = createApiClient(token);

  try {
    const { data } = await client.post<CreateReviewResponse>(
      `/api/patient/review`,
      reviewData // Your helper wraps data as { data: ... }, but Strapi already accepts plain body here
    );
    return data;
  } catch (error: any) {
    throw {
      message:
        error.response?.data?.error?.message ||
        `Failed to create review for appointment ${reviewData.appointmentId}`,
      status: error.response?.status || 500,
    };
  }
};
