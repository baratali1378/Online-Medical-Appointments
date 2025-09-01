"use client";

import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface ProtectedAuthProps {
  children: React.ReactNode;
}

const ProtectedAuth: React.FC<ProtectedAuthProps> = ({ children }) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    if (status === "authenticated") {
      // If user is on login page but already authenticated, redirect to dashboard or callback
      if (pathname.startsWith("/login")) {
        router.replace(callbackUrl);
      }
    }
  }, [status, pathname, router, callbackUrl]);

  if (status === "loading") {
    return <Loading />;
  }

  // If user is unauthenticated and trying to access a protected page
  if (status === "unauthenticated" && !pathname.startsWith("/login")) {
    // Redirect to login with callbackUrl
    router.replace(
      `/login/patient?callbackUrl=${encodeURIComponent(pathname)}`
    );
    return null;
  }

  return <>{children}</>;
};

export default ProtectedAuth;
