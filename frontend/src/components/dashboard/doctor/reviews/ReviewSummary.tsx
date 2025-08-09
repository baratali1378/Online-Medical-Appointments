import { Box, Typography, useTheme, useMediaQuery, Stack } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import { RatingBreakdown } from "@/types/review";
import { ChartFactory } from "./Chart";

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: RatingBreakdown;
}

// Utility functions
const prepareChartData = (ratingBreakdown: RatingBreakdown) => {
  return [5, 4, 3, 2, 1].map((rating) => ({
    rating: `${rating}★`,
    count: ratingBreakdown[rating as keyof RatingBreakdown],
  }));
};

const prepareStackedData = (chartData: ReturnType<typeof prepareChartData>) => {
  return [
    chartData.reduce((acc, cur) => {
      acc[cur.rating] = cur.count;
      return acc;
    }, {} as Record<string, number>),
  ];
};

const getColorPalette = (theme: any) => [
  theme.palette.success.main,
  theme.palette.info.main,
  theme.palette.warning.main,
  theme.palette.error.light,
  theme.palette.error.main,
];

// Main Component
const ReviewSummary = ({
  averageRating,
  totalReviews,
  ratingBreakdown,
}: ReviewSummaryProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Data preparation
  const chartData = prepareChartData(ratingBreakdown);
  const stackedData = prepareStackedData(chartData);
  const colors = getColorPalette(theme);

  // Chart strategies
  const verticalChartStrategy = ChartFactory.createChart("vertical");
  const stackedChartStrategy = ChartFactory.createChart("stacked");

  // Render star rating
  const renderStarRating = () => {
    return [1, 2, 3, 4, 5].map((star) => {
      const isFilled = star <= Math.floor(averageRating);
      const isHalf =
        star === Math.ceil(averageRating) && averageRating % 1 >= 0.5;

      return (
        <Box
          key={star}
          sx={{
            color:
              isFilled || isHalf
                ? theme.palette.warning.main
                : theme.palette.grey[300],
            fontSize: "1.5rem",
          }}
        >
          {isFilled ? "★" : isHalf ? "½" : "☆"}
        </Box>
      );
    });
  };

  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 4,
      }}
    >
      {/* Average Rating and Bar Chart */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Patient Reviews
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Box
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#71C9CE",
            }}
          >
            {averageRating.toFixed(1)}
          </Box>
          <Box>
            <Box display="flex" alignItems="center">
              {renderStarRating()}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ height: 200, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            {verticalChartStrategy.renderChart(chartData, colors, theme)}
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Stacked Bar Chart for Ratings Breakdown */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight="medium" mb={1}>
          Rating Breakdown
        </Typography>

        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            {stackedChartStrategy.renderChart(stackedData, colors, theme)}
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewSummary;
