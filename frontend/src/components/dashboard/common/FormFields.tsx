// components/forms/FormFields.tsx
import { Grid } from "@mui/material";
import { Field, FieldProps } from "formik";
import { TextField } from "@mui/material";
import { FormSelectField } from "@/components/forms/fields/FormSelectField";
interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  multiline?: boolean;
  maxRows?: number;
  InputLabelProps?: any;
  fullWidthGrid?: boolean; // new prop to control Grid sizing
}

export const FormTextField = ({
  name,
  label,
  type = "text",
  disabled = false,
  multiline = false,
  maxRows,
  InputLabelProps,
  fullWidthGrid = false,
}: FormFieldProps) => (
  <Grid item xs={12} sm={fullWidthGrid ? 12 : 6}>
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          type={type}
          disabled={disabled}
          multiline={multiline}
          maxRows={maxRows}
          InputLabelProps={InputLabelProps}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          size="small"
        />
      )}
    </Field>
  </Grid>
);
interface FormGridSelectFieldProps extends FormFieldProps {
  options: Array<{ label: string; value: string }>;
}

export const FormGridSelectField = ({
  name,
  label,
  options,
  disabled = false,
}: FormGridSelectFieldProps) => (
  <Grid item xs={12} sm={6}>
    <FormSelectField
      name={name}
      label={label}
      options={options}
      disabled={disabled}
    />
  </Grid>
);
