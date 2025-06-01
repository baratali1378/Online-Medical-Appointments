import { Box, Typography } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const ReviewNotFound = () => {
  return (
    <Box
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <SentimentDissatisfiedIcon fontSize="large" color="disabled" />
      <Typography variant="h6" color="text.secondary">
        No reviews match your filters.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Try adjusting your search or filters to see more results.
      </Typography>
    </Box>
  );
};

export default ReviewNotFound;
