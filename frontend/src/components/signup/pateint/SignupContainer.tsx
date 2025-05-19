"use client";

import React from "react";
import { useFormik, FormikProvider } from "formik";
import { usePatient } from "@/hooks/signup/patient/usePatient";
import { SignupForm } from "./SignupForm";
import { Container, Box } from "@mui/material";
import { SignupFormValues, Gender } from "@/types/patient";
import { patientProfileSchema } from "@/utils/validation";
import { loginWithCredentials } from "@/lib/authHelper";
import { useRouter } from "next/navigation";

export const SignupContainer: React.FC = () => {
  const { signup, loading, error } = usePatient();
  const router = useRouter();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      birth: "",
    },
    validationSchema: patientProfileSchema,
    onSubmit: async (values) => {
      try {
        const data = await signup({
          ...values,
          gender: values.gender as Gender,
        });
        const result = await loginWithCredentials(
          values.email,
          values.password
        );
        if (result?.error) {
          alert("Signin failed: " + result.error);
        } else {
          router.push("/");
        }
      } catch (err) {
        alert("Signup failed. Please try again." + err);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <FormikProvider value={formik}>
          <SignupForm
            formik={formik}
            loading={loading}
            error={error ? error.message : null}
          />
        </FormikProvider>
      </Box>
    </Container>
  );
};
