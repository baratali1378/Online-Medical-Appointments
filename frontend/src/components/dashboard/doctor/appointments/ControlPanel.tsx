import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, Refresh } from "@mui/icons-material";
import { AppointmentFilters, AppointmentStatus } from "@/types/appointments";
import { useState, useEffect } from "react";

interface ControlPanelProps {
  filters: AppointmentFilters;
  onFilterChange: (filters: AppointmentFilters) => void;
  onRefresh: () => void;
}

export const ControlPanel = ({
  filters,
  onFilterChange,
  onRefresh,
}: ControlPanelProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Local state for search input
  const [searchText, setSearchText] = useState(filters.search || "");

  // Sync local searchText if filters.search changes externally
  useEffect(() => {
    setSearchText(filters.search || "");
  }, [filters.search]);

  // Debounce updating filters.search to parent
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchText !== filters.search) {
        onFilterChange({ ...filters, search: searchText });
      }
    }, 300); // wait 300ms after user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [searchText, filters, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, status: e.target.value as AppointmentStatus });
  };

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
      alignItems={isMobile ? "stretch" : "center"}
      gap={isMobile ? 2 : 3}
      width="100%"
    >
      <TextField
        placeholder="Search by patient name..."
        value={searchText}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
        }}
        size="small"
        fullWidth={isMobile}
        sx={{
          maxWidth: isMobile ? "100%" : 350,
          flexGrow: isMobile ? 0 : 1,
        }}
      />

      <Box
        display="flex"
        gap={2}
        mt={isMobile ? 1 : 0}
        flexWrap="nowrap"
        justifyContent={isMobile ? "flex-start" : "flex-end"}
        width={isMobile ? "100%" : "auto"}
      >
        <TextField
          select
          size="small"
          value={filters.status || "All"}
          onChange={handleStatusChange}
          sx={{
            minWidth: 140,
            flexShrink: 0,
          }}
        >
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(
            (status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            )
          )}
        </TextField>
        <IconButton
          onClick={onRefresh}
          aria-label="refresh appointments"
          color="primary"
          size={isMobile ? "medium" : "small"}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <Refresh />
        </IconButton>
      </Box>
    </Box>
  );
};
