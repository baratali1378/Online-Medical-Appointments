// components/doctor/DoctorReviews.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Pagination,
  Card,
  useTheme,
} from "@mui/material";
import ReviewCard from "@/components/dashboard/doctor/reviews/ReviewCard";
import type { Review } from "@/types/doctor";

interface DoctorReviewsProps {
  reviews: Review[];
  reviewsPerPage?: number;
}

export default function DoctorReviews({
  reviews,
  reviewsPerPage = 4,
}: DoctorReviewsProps) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  if (!reviews.length) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        mt={4}
      >
        No reviews yet.
      </Typography>
    );
  }

  return (
    <Card
      sx={{
        width: "100%",
        mx: "auto",
        p: { xs: 2, sm: 4, md: 5 },
        borderRadius: 3,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        color={"#71C9CE"}
        textAlign="left"
      >
        Patient Reviews
      </Typography>

      <Stack spacing={4}>
        {currentReviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={{
              comment: review.comment,
              id: review.id,
              date: review.date,
              rating: review.rating,
              patient: {
                fullname: review.patient.personal_info.fullname,
                image: review.patient?.personal_info.image?.url || "",
                city: "",
                id: review.patient.id,
              },
            }}
          />
        ))}
      </Stack>

      {pageCount > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      )}
    </Card>
  );
}
