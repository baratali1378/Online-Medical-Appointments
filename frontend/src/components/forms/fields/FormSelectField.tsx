// components/forms/fields/FormSelectField.tsx
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";

interface Option {
  label: string;
  value: string;
}

interface FormSelectFieldProps {
  name: string;
  label: string;
  options: Option[];
}

export const FormSelectField = ({
  name,
  label,
  options,
}: FormSelectFieldProps) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { touched, error } = meta;

  return (
    <FormControl fullWidth error={touched && Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        value={value || ""}
        onChange={(e) => helpers.setValue(e.target.value)}
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
