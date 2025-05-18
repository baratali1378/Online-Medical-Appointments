// lib/authHelper.ts
import { signIn } from "next-auth/react";

export const loginWithCredentials = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  return result;
};
