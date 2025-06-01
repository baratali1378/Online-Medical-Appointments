import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import SearchInput from "./SearchInput";
import FilterPanel from "./FilterPanel";
import FilterToggle from "./FilterToggle";

interface ReviewFiltersProps {
  searchQuery: string;
  ratingFilter: string;
  sortOption: string;
  dateRange: [Date | null, Date | null];
  onSearchChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onDateChange: (range: [Date | null, Date | null]) => void;
}

export default function ReviewFilters({
  searchQuery,
  ratingFilter,
  sortOption,
  dateRange,
  onSearchChange,
  onRatingChange,
  onSortChange,
  onDateChange,
}: ReviewFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  return (
    <Box
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SearchInput searchQuery={searchQuery} onChange={onSearchChange} />
        </Grid>

        {isMobile && (
          <Grid item xs={12}>
            <FilterToggle
              expanded={filtersExpanded}
              onToggle={() => setFiltersExpanded(!filtersExpanded)}
            />
          </Grid>
        )}

        {(filtersExpanded || !isMobile) && (
          <Grid item xs={12} md={6}>
            <FilterPanel
              ratingFilter={ratingFilter}
              sortOption={sortOption}
              dateRange={dateRange}
              onRatingChange={onRatingChange}
              onSortChange={onSortChange}
              onDateChange={onDateChange}
              isMobile={isMobile}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
