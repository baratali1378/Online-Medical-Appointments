"use client";

import React, { useState, useEffect } from "react";
import { useTheme, Box, useMediaQuery } from "@mui/material";
import { SearchView } from "./SearchView";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";
import { useSpecialtiesQuery } from "@/hooks/useSpecialtiesQuery";
import { SearchFilters } from "@/types/search";

export const SearchContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  const [filters, setFilters] = useState<SearchFilters>({
    city: "",
    specialty: "",
    searchQuery: "",
  });

  const { data: citiesData, isLoading: citiesLoading } = useCitiesQuery();
  const { data: specialtiesData, isLoading: specialtiesLoading } =
    useSpecialtiesQuery();

  const cities = citiesData?.map((city) => city.name) || [];
  const specialties = specialtiesData?.map((spec) => spec.name) || [];

  const handleFilterChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    console.log("Search triggered with:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      city: "",
      specialty: "",
      searchQuery: "",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1100,
        mx: "auto",
        px: 2,
        py: isMobile ? 3 : 4,
      }}
    >
      <SearchView
        filters={filters}
        cities={cities}
        specialties={specialties}
        isMobile={isMobile}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSearch={handleSearch}
        loading={citiesLoading || specialtiesLoading}
      />
    </Box>
  );
};
