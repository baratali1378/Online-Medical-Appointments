"use client";

import React from "react";
import { Box, Chip, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ClearIcon from "@mui/icons-material/Clear";
import { DoctorSearchViewProps } from "@/types/search";
import { inter, sharedInputStyle, StyledSelect } from "./utils";

// Main Component
export const SearchView: React.FC<
  DoctorSearchViewProps & { onSearch: () => void }
> = ({
  filters,
  cities,
  specialties,
  isMobile,
  loading,
  onFilterChange,
  onClearFilters,
  onSearch,
}) => {
  const hasFilters = filters.city || filters.specialty || filters.searchQuery;

  return (
    <Box
      sx={{
        width: "100%",
        p: isMobile ? 3 : 4,
        border: "2px solid rgba(178, 227, 242, 0.5)",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        boxShadow: "0 4px 20px rgba(178, 227, 242, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(178, 227, 242, 0.8)",
          boxShadow: "0 4px 25px rgba(178, 227, 242, 0.3)",
        },
      }}
    >
      {/* Search Field */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search doctors by name..."
        value={filters.searchQuery}
        onChange={(e) => onFilterChange("searchQuery", e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#1A374D" }} />
            </InputAdornment>
          ),
          sx: sharedInputStyle,
        }}
        sx={{ mb: 3, fontFamily: inter.style.fontFamily }}
      />

      {/* Filters */}
      <Box display="flex" gap={2} flexDirection={isMobile ? "column" : "row"}>
        <StyledSelect
          value={filters.city}
          onChange={(e) => onFilterChange("city", e.target.value)}
          placeholder="All Cities"
          icon={<LocationOnIcon sx={{ mr: 1, color: "#1A374D" }} />}
          options={cities}
        />

        <StyledSelect
          value={filters.specialty}
          onChange={(e) => onFilterChange("specialty", e.target.value)}
          placeholder="All Specialties"
          icon={<MedicalServicesIcon sx={{ mr: 1, color: "#1A374D" }} />}
          options={specialties}
        />

        <Button
          variant="contained"
          onClick={onSearch}
          disabled={loading}
          sx={{
            borderRadius: "8px",
            px: 4,
            fontFamily: inter.style.fontFamily,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            backgroundColor: "#71C9CE",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#A6E3E9",
            },
          }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Box>

      {/* Active Filters */}
      {hasFilters && (
        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
          {filters.city && (
            <Chip
              label={`City: ${filters.city}`}
              onDelete={() => onFilterChange("city", "")}
              deleteIcon={<ClearIcon />}
              sx={{
                fontFamily: inter.style.fontFamily,
                backgroundColor: "rgba(178, 227, 242, 0.3)",
                color: "#1A374D",
              }}
            />
          )}
          {filters.specialty && (
            <Chip
              label={`Specialty: ${filters.specialty}`}
              onDelete={() => onFilterChange("specialty", "")}
              deleteIcon={<ClearIcon />}
              sx={{
                fontFamily: inter.style.fontFamily,
                backgroundColor: "rgba(178, 227, 242, 0.3)",
                color: "#1A374D",
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
