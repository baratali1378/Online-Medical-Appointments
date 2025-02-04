"use client";


import React from "react";
import { useRouter } from "next/navigation";
import useFetch from "../../useFetch/useLoginFetch";

interface AuthHandlerProps {
    role: "doctor" | "user";
}

const withAuthHandler = (WrappedComponent: React.FC<{ handleSubmit: (values: { email: string; password: string }) => Promise<any>; signupLink: string }>) => {
    return function AuthenticatedComponent({ role }: AuthHandlerProps) {
        const router = useRouter();
        const { postData } = useFetch();

        const handleSubmit = async (values: { email: string; password: string }) => {
            const url = role === "doctor" ? "/api/auth/doctor-login" : "/api/auth/user-login";
            const result = await postData(url, values);

            if (result.success) {
                router.push("/dashboard");
            }
            return result;
        };

        // Set different signup links based on role
        const signupLink = role === "doctor" ? "/doctor-signup" : "/user-signup";

        return <WrappedComponent handleSubmit={handleSubmit} signupLink={signupLink} />;
    };
};

export default withAuthHandler;
