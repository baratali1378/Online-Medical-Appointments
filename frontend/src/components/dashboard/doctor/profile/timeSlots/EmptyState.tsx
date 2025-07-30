// EmptyState.tsx
"use client";

import { Box, Typography } from "@mui/material";
import { Schedule } from "@mui/icons-material";

export const EmptyState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        textAlign: "center",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Schedule sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        No Time Slots Available
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 400, mb: 3 }}
      >
        You haven't added any available time slots yet. Click the button below
        to add your first availability.
      </Typography>
    </Box>
  );
};
