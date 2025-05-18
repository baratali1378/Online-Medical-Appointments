"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useFetch from "../../useFetch/useLoginFetch"; // Assuming your custom hook is inside this folder

interface AuthHandlerProps {
  role: "doctor" | "patient";
}

const withAuthHandler = (
  WrappedComponent: React.FC<{
    handleSubmit: (values: {
      email: string;
      password: string;
      role: "doctor" | "patient";
    }) => Promise<any>;
    signupLink: string;
  }>
) => {
  return function AuthenticatedComponent({ role }: AuthHandlerProps) {
    const router = useRouter();
    const { postData } = useFetch();

    const handleSubmit = async (values: {
      email: string;
      password: string;
      role: "doctor" | "patient";
    }) => {
      // Post data using the provided role
      const result = await postData(values);

      if (result.success) {
        // On successful login, navigate to the dashboard
        router.push("/dashboard");
      }

      return result;
    };

    // Set different signup links based on role
    const signupLink = role === "doctor" ? "/signup/doctor" : "/signup/patient";

    // Render the wrapped component with the handleSubmit and signupLink as props
    return (
      <WrappedComponent handleSubmit={handleSubmit} signupLink={signupLink} />
    );
  };
};

export default withAuthHandler;
