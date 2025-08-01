// components/withAuth.tsx
"use client";

import { Box, CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type WithAuthProps = {
  session: any;
};

export function withAuth<P extends object>(
  Component: React.ComponentType<P & WithAuthProps>,
  requiredRole?: string
) {
  return function AuthenticatedComponent(props: P) {
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

    // ✅ Explicitly tell TS we’re adding `session`
    return <Component {...props} session={session} />;
  };
}
