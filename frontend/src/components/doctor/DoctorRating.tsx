// components/doctor/DoctorRating.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/material";

interface Props {
  rating: number;
  reviewCount?: number;
  size?: "small" | "medium" | "large";
}

export default function DoctorRating({
  rating = 0,
  reviewCount = 0,
  size = "small",
}: Props) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Rating value={rating} precision={0.1} readOnly size={size} />
      <Typography variant="subtitle2" fontWeight={600}>
        {rating ? rating.toFixed(1) : "N/A"}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        ({reviewCount})
      </Typography>
    </Box>
  );
}
