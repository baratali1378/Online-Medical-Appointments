"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  Paper,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import { Star, FilterAlt, Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FilterSection } from "./FilterSection";
import { FormSelectField } from "@/components/forms/fields/FormSelectField";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { FilterValues, SearchSidebarProps } from "@/types/search";
import { AutocompleteInput } from "@/components/home/sections/search/AutoComplete";
import { useDoctorAutocomplete } from "@/hooks/useDoctorAutocomplete";
import { useState } from "react";

const FilterSchema = Yup.object().shape({
  city: Yup.string().nullable(),
  specialty: Yup.string().nullable(),
  query: Yup.string().nullable(),
  verifiedOnly: Yup.boolean(),
  minRating: Yup.number().min(0).max(5),
});

export function SearchSidebar({
  initialFilters = {},
  cities,
  specialties,
  onFilterChange,
  onClose,
  isMobile = false,
}: SearchSidebarProps) {
  const theme = useTheme();

  const defaultValues: FilterValues = {
    city: initialFilters.city || "",
    specialty: initialFilters.specialty || "",
    query: initialFilters.query || "",
    verifiedOnly: initialFilters.verifiedOnly || false,
    minRating: initialFilters.minRating || 0,
  };

  // Keep query state outside Formik to use in the hook
  const [queryValue, setQueryValue] = useState(defaultValues.query);

  // Hook always runs at the top level
  const { data: doctorSuggestions = [], isLoading: doctorsLoading } =
    useDoctorAutocomplete(queryValue);

  return (
    <Paper
      elevation={isMobile ? 0 : 3}
      sx={{
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? "auto" : 0,
        alignSelf: "flex-start",
        minHeight: "100%",
        p: 3,
        borderRadius: isMobile ? 0 : "12px",
        bgcolor: isMobile
          ? theme.palette.background.default
          : theme.palette.background.paper,
        border: isMobile ? "none" : `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterAlt sx={{ mr: 1 }} />
            Filters
          </Box>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      )}

      <Formik
        initialValues={defaultValues}
        validationSchema={FilterSchema}
        onSubmit={(values) => {
          onFilterChange(values);
          if (isMobile && onClose) onClose();
        }}
      >
        {({ values, setFieldValue, resetForm }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flex: 1,
            }}
          >
            {/* Search Autocomplete */}
            <FilterSection title="Search">
              <AutocompleteInput
                value={values.query}
                onChange={(value) => {
                  setFieldValue("query", value);
                  setQueryValue(value); // update state for hook
                }}
                options={doctorSuggestions}
                loading={doctorsLoading}
                placeholder="Doctor name or keyword"
              />
            </FilterSection>

            {/* Location */}
            <FilterSection title="Location">
              <FormSelectField
                name="city"
                label="Location"
                options={[
                  { label: "All Locations", value: "" },
                  ...cities.map((c) => ({ label: c, value: c })),
                ]}
              />
            </FilterSection>

            {/* Specialty */}
            <FilterSection title="Specialty">
              <FormSelectField
                name="specialty"
                label="Specialty"
                options={[
                  { label: "All Specialties", value: "" },
                  ...specialties.map((s) => ({ label: s, value: s })),
                ]}
              />
            </FilterSection>

            {/* Rating */}
            <FilterSection title="Rating">
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Star color="success" />
                <Box sx={{ ml: 1 }} color={"#71C9CE"}>
                  {values.minRating > 0
                    ? `${values.minRating}+ stars`
                    : "Any rating"}
                </Box>
              </Box>
              <Slider
                value={values.minRating}
                color="success"
                onChange={(_, value) =>
                  setFieldValue("minRating", value as number)
                }
                step={1}
                marks
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.verifiedOnly}
                    onChange={(e) =>
                      setFieldValue("verifiedOnly", e.target.checked)
                    }
                    sx={{ p: 0.5 }}
                    color="success"
                  />
                }
                label="Verified doctors only"
                color="#71C9CE"
                sx={{ mt: 1 }}
              />
            </FilterSection>

            {/* Footer */}
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <BrandButton type="submit" variant="contained" fullWidth>
                Apply Filters
              </BrandButton>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => resetForm()}
                fullWidth
              >
                Reset All
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}
