"use client";

import React from "react";
import { Box } from "@mui/material";
import { HeaderSection } from "@/components/home/sections/heading";

const DoctorPage = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Implement search functionality
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        marginTop: "-14px",
        flexDirection: "column",
        backgroundColor: "#F5F7FA", // Background for other sections
      }}
    >
      <HeaderSection
        title="HealthGate"
        subtitle="Your Health, Our Priority - Seamless Care at Your Fingertips"
      />
      {/* <SearchSection onSearch={handleSearch} /> */}

      {/* Add other sections here with different background colors */}
      <Box
        sx={{
          py: 8,
          px: 2,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        {/* Content sections will go here */}
      </Box>
    </Box>
  );
};

export default DoctorPage;
