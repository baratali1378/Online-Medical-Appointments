"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useFetch from "../../useFetch/useLoginFetch"; // Adjust import path

interface AuthHandlerProps {
  role: "doctor" | "patient";
}

const withAuthHandler = (
  WrappedComponent: React.FC<{
    handleSubmit: (values: { email: string; password: string }) => Promise<any>;
    signupLink: string;
    role: string;
  }>
) => {
  return function AuthenticatedComponent({ role }: AuthHandlerProps) {
    const router = useRouter();
    const { postData } = useFetch();

    const handleSubmit = async (values: {
      email: string;
      password: string;
    }) => {
      // Inject role here
      const result = await postData({ ...values, role });

      if (result.success) {
        router.push("/dashboard");
      }

      return result;
    };

    const signupLink = role === "doctor" ? "/signup/doctor" : "/signup/patient";

    return (
      <WrappedComponent
        handleSubmit={handleSubmit}
        signupLink={signupLink}
        role={role}
      />
    );
  };
};

export default withAuthHandler;
