"use client";

import { Box, Button } from "@mui/material";
import Link from "next/link";
import { NavItem } from "../../config/navigation";
import { Montserrat } from "next/font/google";
import { ProfileMenu } from "./ProfileMenu";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface DesktopNavigationProps {
  items: NavItem[];
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export const DesktopNavigation = ({
  items,
  session,
  status,
}: DesktopNavigationProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createNavigationLink = (item: NavItem) => (
    <Box
      key={item.label}
      component={Link}
      href={item.href}
      className={montserrat.className}
      sx={{
        fontWeight: 500,
        fontSize: "0.95rem",
        color: "text.secondary",
        textDecoration: "none",
        px: 1,
        py: 0.5,
        "&:hover": { color: "#71C9CE" },
        transition: "color 0.2s ease",
      }}
    >
      {item.label}
    </Box>
  );

  const createLoginButton = (type: "patient" | "doctor") => {
    const config = {
      patient: {
        href: "/patient-login",
        label: "Patient Login",
        variant: "outlined" as const,
        sx: {
          borderColor: "#E0E0E0",
          "&:hover": { borderColor: "#71C9CE", color: "#71C9CE" },
        },
      },
      doctor: {
        href: "/doctor-login",
        label: "Doctor Login",
        variant: "contained" as const,
        sx: {
          backgroundColor: "#71C9CE",
          "&:hover": {
            backgroundColor: "#5AB5BA",
            transform: "translateY(-1px)",
          },
        },
      },
    };

    return (
      <Button
        key={type}
        variant={config[type].variant}
        component={Link}
        href={config[type].href}
        className={montserrat.className}
        sx={{
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.85rem",
          px: 2,
          py: 0.8,
          color: type === "patient" ? "text.secondary" : "white",
          transition: "all 0.2s ease",
          ...config[type].sx,
        }}
      >
        {config[type].label}
      </Button>
    );
  };

  // Only render navigation links initially
  if (!mounted) {
    return (
      <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
        {items.map(createNavigationLink)}
        <Box sx={{ display: "flex", gap: 1, ml: 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
      {items.map(createNavigationLink)}
      <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
        {session ? (
          <ProfileMenu />
        ) : (
          <>
            {createLoginButton("patient")}
            {createLoginButton("doctor")}
          </>
        )}
      </Box>
    </Box>
  );
};
