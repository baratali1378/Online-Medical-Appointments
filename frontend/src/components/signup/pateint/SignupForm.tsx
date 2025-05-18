// SignupForm.tsx
import { Paper, Typography, Alert, Grid2, Link } from "@mui/material";
import NextLink from "next/link";
import { FormikProps } from "formik";
import { SignupFormValues } from "@/types/patient";
import { signupFormFields } from "@/components/constant/FormConstant";
import { DynamicForm } from "@/components/forms/DynamicForm";

interface SignupFormProps {
  formik: FormikProps<SignupFormValues>;
  loading: boolean;
  error?: string | null;
}

export const SignupForm = ({ formik, loading, error }: SignupFormProps) => {
  return (
    <Paper
      elevation={3}
      sx={{ p: 4, borderRadius: 3, maxWidth: 600, mx: "auto" }}
    >
      <Typography
        variant="h5"
        color="#71C9CE"
        mb={3}
        fontWeight={600}
        textAlign="center"
      >
        🏥 Patient Sign Up
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <DynamicForm
        formik={formik}
        loading={loading}
        fields={signupFormFields}
        buttonLabel="Sign Up"
      />

      <Grid2 size={{ xs: 12 }} mt={2}>
        <Typography variant="body2" textAlign="center">
          Already have an account?{" "}
          <Link
            component={NextLink}
            href="/login/patient"
            color="primary"
            underline="hover"
          >
            Log in here
          </Link>
        </Typography>
      </Grid2>
    </Paper>
  );
};
