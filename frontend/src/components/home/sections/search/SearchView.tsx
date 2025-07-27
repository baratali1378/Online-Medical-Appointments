"use client";

import React from "react";
import {
  Box,
  Chip,
  Button,
  SelectChangeEvent,
  Stack,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ClearIcon from "@mui/icons-material/Clear";
import { DoctorSearchViewProps } from "@/types/search";
import { AutocompleteInput } from "./AutoComplete";
import { StyledSelect, inter } from "./utils";
import { useDoctorAutocomplete } from "@/hooks/useDoctorAutocomplete";

export const SearchView: React.FC<
  DoctorSearchViewProps & { onSearch: () => void }
> = ({
  filters,
  cities,
  specialties,
  isMobile,
  loading,
  onFilterChange,
  onSearch,
}) => {
  const hasFilters = filters.city || filters.specialty || filters.searchQuery;

  const { data: doctorSuggestions = [], isLoading: doctorsLoading } =
    useDoctorAutocomplete(filters.searchQuery);

  return (
    <Box
      sx={{
        width: "100%",
        p: isMobile ? 3 : 4,
        border: "2px solid rgba(178, 227, 242, 0.5)",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        boxShadow: "0 4px 20px rgba(178, 227, 242, 0.2)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Autocomplete Doctor Name Input */}
      <Box>
        <AutocompleteInput
          value={filters.searchQuery}
          onChange={(value) => onFilterChange("searchQuery", value)}
          options={doctorSuggestions}
          loading={doctorsLoading}
          placeholder="Search doctors by name..."
        />
      </Box>

      {/* Filter Selects and Search Button */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        alignItems="center"
      >
        <StyledSelect
          value={filters.city}
          onChange={(e: SelectChangeEvent<string>) =>
            onFilterChange("city", e.target.value)
          }
          placeholder="All Cities"
          icon={<LocationOnIcon sx={{ mr: 1, color: "#1A374D" }} />}
          options={cities}
        />

        <StyledSelect
          value={filters.specialty}
          onChange={(e: SelectChangeEvent<string>) =>
            onFilterChange("specialty", e.target.value)
          }
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
            height: "56px", // match input height
            "&:hover": {
              backgroundColor: "#A6E3E9",
            },
          }}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </Stack>

      {/* Active Filters */}
      {hasFilters && (
        <>
          <Divider />
          <Box display="flex" flexWrap="wrap" gap={1}>
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
            {filters.searchQuery && (
              <Chip
                label={`Search: ${filters.searchQuery}`}
                onDelete={() => onFilterChange("searchQuery", "")}
                deleteIcon={<ClearIcon />}
                sx={{
                  fontFamily: inter.style.fontFamily,
                  backgroundColor: "rgba(178, 227, 242, 0.3)",
                  color: "#1A374D",
                }}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
