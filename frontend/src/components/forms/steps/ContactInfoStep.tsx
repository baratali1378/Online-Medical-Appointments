"use client";

import { Box, Grid, Typography } from "@mui/material";
import { FormTextField } from "@/components/forms/fields/FormTextField";
import { FormSelectField } from "@/components/forms/fields/FormSelectField";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";

interface ContactInfoStepProps {
  phoneLabel?: string;
  cityLabel?: string;
  yearLabel?: string;
  monthLabel?: string;
  dayLabel?: string;
  experienceLabel?: string;
  includeExperience?: boolean;
  birthPrefix?: string;
  phoneField?: string;
  cityField?: string;
}

const ContactInfoStep = ({
  phoneLabel = "Phone Number",
  cityLabel = "City",
  yearLabel = "Year",
  monthLabel = "Month",
  dayLabel = "Day",
  experienceLabel = "Experience",
  includeExperience = true,
  birthPrefix = "birth",
  phoneField = "phone_number",
  cityField = "city",
}: ContactInfoStepProps) => {
  const { data: cities, isLoading } = useCitiesQuery();

  const cityOptions =
    cities?.map((city) => ({
      label: city.name,
      value: city.name,
    })) || [];

  return (
    <Box display="grid" gap={3}>
      <Typography
        variant="subtitle1"
        gutterBottom
        fontWeight={600}
        color="text.primary"
      >
        Date of Birth
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormTextField
            name={`${birthPrefix}Year`}
            label={yearLabel}
            type="number"
            inputProps={{
              min: 1900,
              max: new Date().getFullYear(),
              placeholder: "YYYY",
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormTextField
            name={`${birthPrefix}Month`}
            label={monthLabel}
            type="number"
            inputProps={{ min: 1, max: 12, placeholder: "MM" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormTextField
            name={`${birthPrefix}Day`}
            label={dayLabel}
            type="number"
            inputProps={{ min: 1, max: 31, placeholder: "DD" }}
            fullWidth
          />
        </Grid>
      </Grid>

      <FormTextField
        name={phoneField}
        label={phoneLabel}
        type="tel"
        fullWidth
      />

      <FormSelectField
        name={cityField}
        label={cityLabel}
        options={isLoading ? [] : cityOptions}
      />

      {includeExperience && (
        <FormTextField
          name="experience"
          label={experienceLabel}
          type="text"
          fullWidth
        />
      )}
    </Box>
  );
};

export default ContactInfoStep;
