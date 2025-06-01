"use client";

import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import ReviewSummary from "../ReviewSummary";
import ReviewFilters from "../filters/ReviewsFilter";
import ReviewCard from "../ReviewCard";
import ReviewPagination from "../ReviewPagination";
import ReviewNotFound from "./ReviewsNotFound";
import { ReviewResponse } from "@/types/review";
import { filterReviews, sortReviews } from "./helpers";

interface DoctorReviewsProps {
  data: ReviewResponse["data"];
}

const reviewsPerPage = 5;

export default function DoctorReviews({ data }: DoctorReviewsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReviews = filterReviews(
    data.reviews,
    searchQuery,
    ratingFilter,
    dateRange
  );
  const sortedReviews = sortReviews(filteredReviews, sortOption);
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, ratingFilter, sortOption, dateRange]);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: isMobile ? 1 : 3,
        py: 3,
      }}
    >
      <ReviewSummary
        averageRating={data.averageRating}
        totalReviews={data.totalReviews}
        ratingBreakdown={data.ratingBreakdown}
      />

      <ReviewFilters
        searchQuery={searchQuery}
        ratingFilter={ratingFilter}
        sortOption={sortOption}
        dateRange={dateRange}
        onSearchChange={setSearchQuery}
        onRatingChange={setRatingFilter}
        onSortChange={setSortOption}
        onDateChange={setDateRange}
      />

      {paginatedReviews.length > 0 ? (
        <Box sx={{ display: "grid", gap: 2, mb: 4 }}>
          {paginatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Box>
      ) : (
        <ReviewNotFound />
      )}

      {totalPages > 1 && (
        <ReviewPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Box>
  );
}
