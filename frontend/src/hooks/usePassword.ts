// src/hooks/usePassword.ts
import { useMutation } from "@tanstack/react-query";
import {
  sendChangePassword,
  sendForgotPassword,
  sendResetPassword,
} from "@/service/passwordService";
import {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  ApiResponse,
  ChangePasswordFormValues,
} from "@/types/password";

export const useForgotPassword = () => {
  return useMutation<ApiResponse, Error, ForgotPasswordFormValues>({
    mutationFn: (data) => sendForgotPassword(data),
  });
};

export const useResetPassword = () => {
  return useMutation<ApiResponse, Error, ResetPasswordFormValues>({
    mutationFn: (data) => sendResetPassword(data),
  });
};

/**
 * Change Password Hook
 * @param role 'doctor' or 'patient'
 * @param token JWT token of the logged in user
 */
export const useChangePassword = (
  role: "doctor" | "patient",
  token: string
) => {
  return useMutation<ApiResponse, Error, ChangePasswordFormValues>({
    mutationFn: (data) => sendChangePassword(role, token, data),
  });
};
