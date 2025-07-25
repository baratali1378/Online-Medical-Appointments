// components/dashboard/doctor/medical/FilterBar.tsx
"use client";
import React from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterDate: string;
  onFilterDateChange: (value: string) => void;
  followUpsOnly: boolean;
  onFollowUpsOnlyChange: (checked: boolean) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  filterDate,
  onFilterDateChange,
  followUpsOnly,
  onFollowUpsOnlyChange,
}) => (
  <Box
    component="form"
    role="search"
    noValidate
    autoComplete="off"
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
      mb: 3,
      alignItems: "center",
    }}
  >
    <TextField
      id="search-records"
      label="Search Patient or Diagnosis"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      size="small"
      placeholder="e.g. John Doe or Diabetes"
      sx={{ flex: 1, minWidth: 240 }}
    />

    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="filter-date-label">Date Filter</InputLabel>
      <Select
        labelId="filter-date-label"
        id="filter-date"
        value={filterDate}
        label="Date Filter"
        onChange={(e) => onFilterDateChange(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="thisWeek">This Week</MenuItem>
      </Select>
    </FormControl>

    <FormControlLabel
      control={
        <Checkbox
          checked={followUpsOnly}
          onChange={(e) => onFollowUpsOnlyChange(e.target.checked)}
          color="primary"
        />
      }
      label="Follow-ups Only"
    />
  </Box>
);
