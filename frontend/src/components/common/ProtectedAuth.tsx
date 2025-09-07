"use client";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface ProtectedAuthProps {
  children: React.ReactNode;
}

const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  // List of public routes that do NOT require authentication
  const publicPaths = [
    "/login",
    "/signup",
    "/signup/patient",
    "/signup/doctor",
    "/forgot-password",
  ];

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect authenticated users away from login pages
      if (pathname.startsWith("/login")) {
        router.replace(callbackUrl);
      }
    }
  }, [status, pathname, router, callbackUrl]);

  // Redirect unauthenticated users if they try to access protected pages
  if (
    status === "unauthenticated" &&
    !publicPaths.some((path) => pathname.startsWith(path))
  ) {
    router.replace(
      `/login/patient?callbackUrl=${encodeURIComponent(pathname)}`
    );
    return null;
  }

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedAuth;
