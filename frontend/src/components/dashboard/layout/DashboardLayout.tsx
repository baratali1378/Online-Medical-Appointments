"use client";

import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import SidebarWrapper from "../sidebar/SidebarWrapper";
import ResponsiveAppBar from "./ResponsiveAppBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <ResponsiveAppBar onDrawerToggle={handleDrawerToggle} />

      {/* Sidebar */}
      <SidebarWrapper
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: "240px" }, // 💡 Push content to the right on desktop
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
