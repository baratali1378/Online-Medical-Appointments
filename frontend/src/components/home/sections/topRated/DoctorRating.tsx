// components/doctor/DoctorRating.tsx
import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface DoctorRatingProps {
  rating: number;
  reviewCount: number;
  size?: "small" | "medium" | "large";
}

const DoctorRating: React.FC<DoctorRatingProps> = ({
  rating,
  reviewCount,
  size = "medium",
}) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return { iconSize: 18, variant: "body2" };
      case "large":
        return { iconSize: 28, variant: "h6" };
      default:
        return { iconSize: 24, variant: "body1" };
    }
  };

  const { iconSize, variant } = getSize();

  return (
    <Tooltip title={`${rating.toFixed(1)} average from ${reviewCount} reviews`}>
      <Box display="flex" alignItems="center" gap={1}>
        <Rating
          value={rating}
          precision={0.1}
          readOnly
          size={size}
          icon={<StarIcon fontSize="inherit" sx={{ color: "#FFC107" }} />}
          emptyIcon={
            <StarBorderIcon fontSize="inherit" sx={{ color: "#FFC107" }} />
          }
        />
        <Typography
          variant={variant as any}
          fontWeight={500}
          color="text.primary"
        >
          {rating.toFixed(1)}
        </Typography>
        <Typography variant={variant as any} color="text.secondary">
          ({reviewCount})
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default React.memo(DoctorRating);
