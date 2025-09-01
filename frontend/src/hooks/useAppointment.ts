import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createStripeCheckoutSession } from "@/service/appointmentService";
import type {
  StripeCheckoutPayload,
  StripeCheckoutResponse,
} from "@/types/appointments";
import { toast } from "react-toastify";

/**
 * Custom hook to create an appointment via Stripe
 */
export function useCreateAppointment(
  token: string
): UseMutationResult<void, Error, StripeCheckoutPayload> {
  return useMutation<void, Error, StripeCheckoutPayload>({
    mutationFn: async (payload: StripeCheckoutPayload) => {
      // Directly create a Stripe checkout session
      const checkout: StripeCheckoutResponse =
        await createStripeCheckoutSession(token, payload);

      // Redirect user to Stripe checkout page
      window.location.href = checkout.url;
    },
    onError: (error: any) => {
      // Show toast notification on error
      toast.error(
        error?.message || "Failed to create appointment. Please try again."
      );
      console.error("Stripe checkout error:", error);
    },
    onSuccess: () => {
      toast.success("Redirecting to Stripe for payment...");
    },
  });
}
