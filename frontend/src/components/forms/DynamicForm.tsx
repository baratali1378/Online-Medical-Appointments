import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import { FormTextField } from "./fields/FormTextField";
import { PasswordField } from "./fields/FormPasswordField";
import { SelectField } from "./fields/FormSelectField";
import { FormSubmitButton } from "./fields/FormSubmitButton";
import { FormFieldConfig } from "@/types/formFields";

interface DynamicFormProps<T> {
  formik: FormikProps<T>;
  loading: boolean;
  fields: FormFieldConfig[];
  buttonLabel?: string;
}

export const DynamicForm = <T,>({
  formik,
  loading,
  fields,
  buttonLabel = "Submit",
}: DynamicFormProps<T>) => (
  <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid item xs={12} key={field.name}>
          {field.type === "password" ? (
            <PasswordField
              name={field.name}
              type="text"
              label={field.label}
              placeholder={field.placeholder}
            />
          ) : field.type === "select" ? (
            <SelectField
              name={field.name}
              label={field.label}
              type="select"
              options={field.options!}
            />
          ) : (
            <FormTextField
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
            />
          )}
        </Grid>
      ))}
      <Grid item xs={12}>
        <FormSubmitButton loading={loading}>{buttonLabel}</FormSubmitButton>
      </Grid>
    </Grid>
  </form>
);
