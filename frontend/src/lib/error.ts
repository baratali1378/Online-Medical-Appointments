import axios from "axios";

export function handleServiceError(error: unknown, message: string): never {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.error?.message ||
        error.response?.data?.message ||
        message
    );
  }
  throw new Error(message);
}
