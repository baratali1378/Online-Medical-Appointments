import {
  Box,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ReviewPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: ReviewPaginationProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      alignItems="center"
      justifyContent="center"
      mt={5}
      gap={2}
    >
      {/* Label */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          fontSize: isMobile ? "0.85rem" : "1rem",
        }}
      >
        Page {currentPage} of {totalPages}
      </Typography>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        size={isMobile ? "small" : "medium"}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={1}
        showFirstButton={!isMobile}
        showLastButton={!isMobile}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: 2,
            fontWeight: 500,
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default ReviewPagination;
