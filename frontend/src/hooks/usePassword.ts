// src/hooks/usePassword.ts
import { useMutation } from "@tanstack/react-query";
import {
  sendForgotPassword,
  sendResetPassword,
} from "@/service/passwordService";
import {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  ApiResponse,
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
