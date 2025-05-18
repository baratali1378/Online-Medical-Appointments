// components/navigation/NavLinkItem.tsx
"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

interface NavLinkItemProps {
  href: string;
  label: string;
  onClick?: () => void;
  sx?: object;
}

export const NavLinkItem = ({ href, label, onClick, sx }: NavLinkItemProps) => (
  <Box
    component={Link}
    href={href}
    onClick={onClick}
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
      ...sx,
    }}
  >
    {label}
  </Box>
);
