"use client";

import React from "react";
import { Box } from "@mui/material";
import { HeaderSection } from "@/components/home/sections/Heading";
import { SearchContainer } from "@/components/home/sections/search/SearchContainer";

const Page = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F7FA",
        marginTop: "-14px",
      }}
    >
      {/* Unified Top Section (Header + Search) */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #DFF6FF, #B2EBF2)",
          px: 2,
          py: 6,
        }}
      >
        <HeaderSection
          title="HealthGate"
          subtitle="Your Health, Our Priority - Seamless Care at Your Fingertips"
        />
        <SearchContainer />
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          py: 8,
          px: 2,
          backgroundColor: "#ffffff",
          flex: 1,
        }}
      >
        {/* Other sections will go here */}
      </Box>
    </Box>
  );
};

export default Page;
