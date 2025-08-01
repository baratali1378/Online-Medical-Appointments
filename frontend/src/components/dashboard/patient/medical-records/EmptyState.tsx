"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

interface EmptyStateProps {
  icon?: React.ReactNode; // Can pass emoji or MUI icon
  title: string;
  description: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "📄",
  title,
  description,
}) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={10}
      textAlign="center"
      sx={{
        color: "text.secondary",
        border: `2px dashed ${theme.palette.divider}`,
        borderRadius: 4,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box sx={{ fontSize: 64, mb: 2 }}>{icon}</Box>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" maxWidth={360}>
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;
