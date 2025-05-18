// components/navigation/DesktopNavigation.tsx
"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { NavItem } from "@/config/navigation";
import { Session } from "next-auth";
import { ProfileMenu } from "./ProfileMenu";
import { LoginButton } from "./LoginButton";
import { NavLinkItem } from "./NavLinkItem";

interface DesktopNavigationProps {
  items: NavItem[];
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export const DesktopNavigation = ({
  items,
  session,
}: DesktopNavigationProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
      {items.map((item) => (
        <NavLinkItem key={item.label} href={item.href} label={item.label} />
      ))}
      <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
        {mounted &&
          (session ? (
            <ProfileMenu />
          ) : (
            <>
              <LoginButton type="patient" />
              <LoginButton type="doctor" />
            </>
          ))}
      </Box>
    </Box>
  );
};
