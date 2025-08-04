"use client";

import React from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

const genderOptions = ["Male", "Female", "Other", ""] as const;

interface FilterBarProps {
  filters: { search: string; gender: string; city: string };
  onChange: (filters: { search: string; gender: string; city: string }) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={2}
      mb={3}
      alignItems={isMobile ? "stretch" : "center"}
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Search */}
      <TextField
        placeholder="Search by name or email"
        size="small"
        variant="outlined"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        sx={{
          flex: 1,
          minWidth: isMobile ? "100%" : 220,
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      {/* Gender */}
      <TextField
        select
        label="Gender"
        size="small"
        variant="outlined"
        value={filters.gender}
        onChange={(e) => onChange({ ...filters, gender: e.target.value })}
        sx={{
          minWidth: isMobile ? "100%" : 150,
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
        }}
      >
        {genderOptions.map((gender) => (
          <MenuItem key={gender} value={gender}>
            {gender || "Any"}
          </MenuItem>
        ))}
      </TextField>

      {/* Reset Button */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<RefreshIcon />}
        onClick={onReset}
        sx={{
          minWidth: isMobile ? "100%" : 130,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Reset
      </Button>
    </Stack>
  );
};
