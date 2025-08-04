// components/ReviewCard.tsx
import {
  Box,
  Typography,
  Avatar,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from "@mui/material";
import { format } from "date-fns";
import { Review } from "@/types/review";
import RoomIcon from "@mui/icons-material/Room";
import StarRating from "./StarRating";
import Link from "next/link";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Header: Avatar, Name, Date, Stars */}
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isMobile ? "flex-start" : "center"}
        spacing={isMobile ? 2 : 0}
        mb={2}
      >
        <Link
          href={`/dashboard/doctor/patients/${review.patient.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={`${API_URL}${review.patient.image}`}
              alt={review.patient.fullname}
              sx={{ width: 56, height: 56, bgcolor: theme.palette.grey[200] }}
            >
              {review.patient.fullname.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {review.patient.fullname}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {format(new Date(review.date), "MMMM d, yyyy")}
              </Typography>
            </Box>
          </Stack>
        </Link>
        <StarRating rating={review.rating} />
      </Stack>

      {/* Location */}
      {review.patient.city && (
        <Box mb={2}>
          <Chip
            icon={<RoomIcon fontSize="small" />}
            label={review.patient.city}
            variant="outlined"
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
            }}
          />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Comment */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.05rem",
          lineHeight: 1.7,
          color: theme.palette.text.primary,
          position: "relative",
          pl: 3,
          "&:before": {
            content: '"“"',
            position: "absolute",
            left: 0,
            top: -20,
            fontSize: "2.5rem",
            color: theme.palette.grey[300],
            fontFamily: "serif",
          },
        }}
      >
        {review.comment}
      </Typography>
    </Box>
  );
};

export default ReviewCard;
