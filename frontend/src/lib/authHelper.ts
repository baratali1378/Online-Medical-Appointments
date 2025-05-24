// lib/authHelper.ts
import { signIn } from "next-auth/react";

export const loginWithCredentials = async (
  email: string,
  password: string,
  role: string
) => {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
    role,
  });

  return result;
};
