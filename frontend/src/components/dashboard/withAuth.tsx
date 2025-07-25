// components/withAuth.tsx
"use client";

import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth<T>(
  Component: React.ComponentType<T>,
  requiredRole?: string
) {
  return function AuthenticatedComponent(props: T) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return;
      if (!session || (requiredRole && session.user.role !== requiredRole)) {
        router.replace("/");
      }
    }, [status, session, requiredRole, router]);

    if (status === "loading" || !session) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      );
    }

    return <Component {...props} session={session} />;
  };
}
