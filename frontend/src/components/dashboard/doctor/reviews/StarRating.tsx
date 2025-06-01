// components/StarRating.tsx
import { Box, Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getStarColor } from "@/utils/color";

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const starColor = getStarColor(rating);

  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < fullStars) {
      return <StarIcon key={i} htmlColor={starColor} fontSize="small" />;
    } else if (i === fullStars && hasHalfStar) {
      return <StarHalfIcon key={i} htmlColor={starColor} fontSize="small" />;
    } else {
      return <StarBorderIcon key={i} htmlColor="#ccc" fontSize="small" />;
    }
  });

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box display="flex">{stars}</Box>
      <Chip
        label={rating.toFixed(1)}
        size="small"
        sx={{
          fontWeight: "bold",
          fontSize: "0.8rem",
          backgroundColor: starColor,
          color: "#fff",
        }}
      />
    </Box>
  );
};

export default StarRating;
