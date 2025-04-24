// components/DesktopNavigation.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Box } from "@mui/material";
import { ProfileLink } from "./ProfileLink";
import { LoginButtons } from "./LoginButton";
import { useState } from "react";

const montserrat = Montserrat({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const DesktopNavigation = ({
  navItems,
}: {
  navItems: Array<{ label: string; href: string }>;
}) => {
  const { data: session, status } = useSession();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "8px 0",
      }}
    >
      {/* Regular navigation items */}
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={montserrat.className}
          style={{
            fontWeight: 500,
            fontSize: "0.95rem",
            color: hoveredLink === item.href ? "#71C9CE" : "text.secondary",
            textDecoration: "none",
            padding: "4px 8px",
            transition: "color 0.2s ease",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHoveredLink(item.href)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {item.label}
        </Link>
      ))}

      {/* Authentication section */}
      {status === "loading" ? (
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #71C9CE",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      ) : session ? (
        <ProfileLink imageUrl={session.user?.image ?? ""} />
      ) : (
        <LoginButtons />
      )}
    </Box>
  );
};
