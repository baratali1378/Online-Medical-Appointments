"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface LoginValues {
  email: string;
  password?: string;
  role: string;
}

interface FetchResult {
  success: boolean;
  message?: string;
}

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const postData = async (values: LoginValues): Promise<FetchResult> => {
    setLoading(true);
    try {
      const loginResult = await signIn("credentials", {
        ...values,
        redirect: false, // important to prevent page reload
      });

      setLoading(false);

      if (loginResult?.error) {
        return {
          success: false,
          message: loginResult.error,
        };
      }

      return {
        success: true,
        message: "Login successful",
      };
    } catch (error: any) {
      setLoading(false);
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  };

  return { postData, loading };
};

export default useFetch;
