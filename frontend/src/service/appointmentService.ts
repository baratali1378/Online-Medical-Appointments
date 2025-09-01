import { createApiClient } from "@/lib/strapiClient";
import type {
  StripeCheckoutPayload,
  StripeCheckoutResponse,
} from "@/types/appointments";

/**
 * Create Stripe checkout session for a doctor appointment
 * @param token Auth token of patient
 * @param payload Stripe payload (doctorId, slotId, price)
 */
export async function createStripeCheckoutSession(
  token: string,
  payload: StripeCheckoutPayload
): Promise<StripeCheckoutResponse> {
  console.log("token", token);
  const client = createApiClient(token);

  try {
    // Matches your Strapi backend endpoint
    const response = await client.post<StripeCheckoutResponse>(
      "api/appointments/patient/create-checkout-session",
      payload
    );
    return response.data; // { url: string }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.error?.message ||
        "Failed to create Stripe checkout session"
    );
  }
}
