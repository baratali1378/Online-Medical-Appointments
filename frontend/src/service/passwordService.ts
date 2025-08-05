import { postData } from "@/lib/strapiClient";
import {
  ApiResponse,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from "@/types/password";

export async function sendResetPassword(data: ResetPasswordFormValues) {
  return postData<ApiResponse>("/auth/reset-password", data);
}

export async function sendForgotPassword(data: ForgotPasswordFormValues) {
  return postData<ApiResponse>("/auth/request-reset", data);
}
