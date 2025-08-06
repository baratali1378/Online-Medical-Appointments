import { createApiClient, postData } from "@/lib/strapiClient";
import {
  ApiResponse,
  ChangePasswordFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/types/password";

export async function sendResetPassword(data: ResetPasswordFormValues) {
  return postData<ApiResponse>("/auth/reset-password", data);
}

export async function sendForgotPassword(data: ForgotPasswordFormValues) {
  return postData<ApiResponse>("/auth/request-reset", data);
}

/**
 * Change password for Doctor or Patient
 * @param role - 'doctor' or 'patient'
 * @param token - JWT token from logged in user
 */
export async function sendChangePassword(
  role: "doctor" | "patient",
  token: string,
  data: ChangePasswordFormValues
) {
  const client = createApiClient(token);

  // Endpoint depends on role
  const endpoint =
    role === "doctor"
      ? "/api/auth/doctor/change-password"
      : "/api/auth/patient/change-password";

  const response = await client.put<ApiResponse>(endpoint, data);
  return response.data;
}
