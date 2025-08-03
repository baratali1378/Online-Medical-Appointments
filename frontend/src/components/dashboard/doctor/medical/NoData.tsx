// components/MedicalRecords/NoData.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import MedicalIcon from "@mui/icons-material/MedicalServices";

interface NoDataProps {
  message?: string;
}

export const NoData: React.FC<NoDataProps> = ({
  message = "No medical records found.",
}) => {
  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
        color: "text.secondary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <MedicalIcon sx={{ fontSize: 60, opacity: 0.3 }} />
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};
