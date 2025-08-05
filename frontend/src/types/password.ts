export interface ResetPasswordPageProps {
  searchParams: {
    token?: string;
  };
}

export interface ForgotPasswordFormValues {
  email: string;
  role: string;
}

export interface ResetPasswordFormValues {
  password: string;
  token: string;
}

export interface ApiResponse {
  message: string;
}
