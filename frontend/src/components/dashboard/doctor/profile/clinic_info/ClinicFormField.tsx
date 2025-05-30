"use client";

import { Grid2 } from "@mui/material";
import { FormTextField } from "@/components/dashboard/common/FormFields";
import { useTheme } from "@mui/material";

interface ClinicFormFieldsProps {
  isSubmitting?: boolean;
}

export const ClinicFormFields = ({ isSubmitting }: ClinicFormFieldsProps) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <FormTextField
          name="clinic_name"
          label="Clinic Name"
          placeHolder="Enter clinic name"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isSubmitting}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <FormTextField
          name="phone"
          label="Phone Number"
          type="tel"
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isSubmitting}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <FormTextField
          name="address"
          label="Address"
          multiline
          maxRows={6}
          fullWidthGrid
          InputLabelProps={{
            shrink: true,
          }}
          disabled={isSubmitting}
        />
      </Grid2>
    </Grid2>
  );
};
