"use client";

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Playfair_Display } from "next/font/google";
import { Inter } from "next/font/google";

// Load Google Fonts (component-based)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

interface HeaderSectionProps {
  title: string;
  subtitle: string;
}

export const HeaderSection = ({ title, subtitle }: HeaderSectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  return (
    <Box
      sx={{
        py: isMobile ? 6 : 10,
        px: 3,
        background: "linear-gradient(135deg, #CBF1F5, #A6E3E9)",
        color: "#1A374D",
        width: "100%",
        textAlign: "center",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant={isMobile ? "h4" : "h2"}
        component="h1"
        className={playfair.className}
        sx={{
          fontWeight: 700,
          mb: 2,
          letterSpacing: "0.5px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant={isMobile ? "body1" : "h6"}
        component="h2"
        className={inter.className}
        sx={{
          fontWeight: 400,
          maxWidth: 720,
          mx: "auto",
          lineHeight: 1.6,
          color: "#406882", // A complementary soft dark blue
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};
