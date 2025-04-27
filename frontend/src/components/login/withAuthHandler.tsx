"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useFetch from "../../useFetch/useLoginFetch";

interface AuthHandlerProps {
  role: "doctor" | "user";
}

const withAuthHandler = (
  WrappedComponent: React.FC<{
    handleSubmit: (values: { email: string; password: string }) => Promise<any>;
    signupLink: string;
  }>
) => {
  return function AuthenticatedComponent({ role }: AuthHandlerProps) {
    const router = useRouter();
    const { postData } = useFetch();
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

    const handleSubmit = async (values: {
      email: string;
      password: string;
    }) => {
      const url =
        role === "doctor"
          ? `${API_URL}/api/auth/doctor-login`
          : `${API_URL}/api/patients/login`;
      const result = await postData(url, values);

      if (result.success) {
        if (role == "user") router.push("/dashboard/patient");
        else router.push("/dashboard/doctor");
      }
      return result;
    };

    // Set different signup links based on role
    const signupLink = role === "doctor" ? "/doctor-signup" : "/patient-signup";

    return (
      <WrappedComponent handleSubmit={handleSubmit} signupLink={signupLink} />
    );
  };
};

export default withAuthHandler;
