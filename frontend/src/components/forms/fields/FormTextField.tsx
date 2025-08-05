// components/shared/FormTextField.tsx
import { TextField } from "@mui/material";
import { Field, useField } from "formik";

interface FormTextFieldProps {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  [key: string]: any;
}

export const FormTextField = ({
  name,
  label,
  type = "text",
  multiline = false,
  rows,
  ...props
}: FormTextFieldProps) => {
  const [field, meta] = useField(name);

  // Default to multiline if type is "text" (to support Strapi text fields)
  const isMultiline = multiline ?? type === "text";

  return (
    <Field
      as={TextField}
      name={name}
      label={label}
      type={type}
      fullWidth
      variant="outlined"
      margin="normal"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      multiline={isMultiline}
      rows={rows ?? (isMultiline ? 3 : 1)}
      {...props}
    />
  );
};
