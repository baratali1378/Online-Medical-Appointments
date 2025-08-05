"use client";

import React from "react";
import {
  Container,
  CssBaseline,
  Typography,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { useForgotPassword } from "@/hooks/usePassword";
import { TextField } from "@mui/material";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "";

  const {
    mutate: forgotPassword,
    isPending,
    isSuccess,
    data,
    error,
  } = useForgotPassword();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            mt: 10,
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            📧 Forgot Password
          </Typography>

          {!isSuccess && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Enter your registered email address. We will send you a link to
              reset your password.
            </Typography>
          )}

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {(error as Error).message}
            </Alert>
          )}

          {isSuccess && data?.message ? (
            <Alert
              severity="success"
              sx={{
                width: "100%",
                mb: 2,
                fontSize: 16,
                p: 3,
                borderRadius: 2,
              }}
            >
              {data.message}
              <Typography variant="body2" sx={{ mt: 1 }}>
                Please check your email for the password reset link.
              </Typography>
            </Alert>
          ) : (
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (!role) {
                  alert("Role is missing in URL.");
                  return;
                }
                forgotPassword({
                  email: values.email,
                  role,
                });
              }}
            >
              {({ errors, touched, handleChange, handleBlur, values }) => (
                <Form style={{ width: "100%" }} noValidate>
                  <Stack spacing={4}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      autoComplete="email"
                    />

                    <BrandButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isPending || !role}
                    >
                      {isPending ? "Sending..." : "Send Reset Link"}
                    </BrandButton>
                  </Stack>
                  {!role && (
                    <Typography
                      color="error"
                      variant="body2"
                      align="center"
                      sx={{ mt: 1 }}
                    >
                      Invalid or missing role in URL.
                    </Typography>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </Paper>
      </Container>
    </>
  );
}
