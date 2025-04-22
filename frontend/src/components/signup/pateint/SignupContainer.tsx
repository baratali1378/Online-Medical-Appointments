"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePatient } from "@/hooks/usePatient";
import { SignupForm } from "./SignupForm";
import { Container, Box } from "@mui/material";
import { SignupFormValues, Gender, genderOptions } from "@/types/patient";

export const SignupContainer: React.FC = () => {
  const { signup, loading, error } = usePatient();

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      birth: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      password: Yup.string().min(6).required("Password is required"),
      gender: Yup.mixed<Gender>()
        .oneOf(genderOptions)
        .required("Gender is required"),
      birth: Yup.date().optional(),
    }),
    onSubmit: async (values) => {
      const payload = {
        ...values,
        gender: values.gender as Gender,
      };
      try {
        const data = await signup(payload);
        console.log("hi", data);
        alert("Signup successful");
      } catch {}
    },
  });

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <SignupForm
          formik={formik}
          loading={loading}
          error={error}
          genderOptions={genderOptions}
        />
      </Box>
    </Container>
  );
};
