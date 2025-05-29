// app/components/auth/ProtectedAuth.tsx or a relevant path

"use client";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface ProtectedAuthProps {
  children: React.ReactNode;
}

const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status == "unauthenticated") {
    <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedAuth;
