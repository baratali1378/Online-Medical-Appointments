"use client";

import { Box, CssBaseline } from "@mui/material";
import ResponsiveDrawer from "@/components/dashboard/layout/Drawer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";
import { useSession } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession(); // Get the user's role from the context
  const role = session?.user.role;
  const router = useRouter();

  // Redirect to doctor/patient pages if role is not set yet
  useEffect(() => {
    if (!role) {
      router.push("/"); // or some login page if no role is found
    }
  }, [role, router]);

  // If no role (loading session), you can show a loading state
  if (!role) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: "flex", bgcolor: "red" }}>
      <CssBaseline />
      <ResponsiveDrawer /> {/* Sidebar (Drawer) */}
      {/* Render the content passed via children */}
      <Box
        component="main"
        sx={{
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        {children} {/* Render the page content */}
      </Box>
    </Box>
  );
}
