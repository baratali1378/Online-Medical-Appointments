// components/shared/FormTextField.tsx
import { TextField } from "@mui/material";
import { Field, useField } from "formik";

interface FormTextFieldProps {
  name: string;
  label: string;
  type?: string;
  [key: string]: any;
}

export const FormTextField = ({
  name,
  label,
  type = "text",
  ...props
}: FormTextFieldProps) => {
  const [field, meta] = useField(name);

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
      {...props}
    />
  );
};
