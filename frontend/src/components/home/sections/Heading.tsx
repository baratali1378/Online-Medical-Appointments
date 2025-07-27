"use client";

import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

interface HeaderSectionProps {
  title: string;
  subtitle: string;
}

export const HeaderSection = ({ title, subtitle }: HeaderSectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  return (
    <Box
      sx={{
        textAlign: "center",
        color: "#1A374D",
        mb: isMobile ? 4 : 6,
        px: 2,
        overflow: "hidden", // Prevent scroll overflow during animation
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          component="h1"
          className={playfair.className}
          sx={{
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.3,
            letterSpacing: "-0.5px",
            fontSize: isMobile ? "2rem" : "3rem",
          }}
        >
          <span style={{ color: "#406882" }}>{title}</span>
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
      >
        <Typography
          variant="body1"
          component="p"
          className={inter.className}
          sx={{
            fontSize: isMobile ? "1rem" : "1.125rem",
            maxWidth: "700px",
            mx: "auto",
            color: "#406882",
            fontWeight: 400,
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </Typography>
      </motion.div>
    </Box>
  );
};
