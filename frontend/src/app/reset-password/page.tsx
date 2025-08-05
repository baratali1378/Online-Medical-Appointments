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
import { useResetPassword } from "@/hooks/usePassword";
import { useSearchParams } from "next/navigation";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { PasswordField } from "@/components/forms/fields/FormPasswordField"; // <-- Adjust this import path

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const {
    mutate: resetPassword,
    isPending,
    isSuccess,
    data,
    error,
  } = useResetPassword();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            mt: 10,
            p: 6,
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
            🔒 Reset Your Password
          </Typography>

          {!isSuccess && (
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Please enter your new password below.
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
              sx={{ width: "100%", mb: 2, fontSize: 18, p: 3, borderRadius: 2 }}
            >
              {data.message}
              <Typography variant="body1" sx={{ mt: 2 }}>
                Your password has been reset successfully. You can now{" "}
                <a
                  href="/login"
                  style={{ color: "#1976d2", textDecoration: "underline" }}
                >
                  log in
                </a>{" "}
                with your new password.
              </Typography>
            </Alert>
          ) : (
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                if (!token) return;
                resetPassword({
                  password: values.password,
                  token,
                });
              }}
            >
              {() => (
                <Form style={{ width: "100%" }} noValidate>
                  <Stack spacing={6}>
                    <PasswordField
                      name="password"
                      label="New Password"
                      placeholder="Enter new password"
                      type={"password"}
                    />

                    <PasswordField
                      name="confirmPassword"
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                      type={"password"}
                    />

                    <BrandButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isPending || !token}
                    >
                      {isPending ? "Resetting..." : "Reset Password"}
                    </BrandButton>
                  </Stack>
                  {!token && (
                    <Typography
                      color="error"
                      variant="body2"
                      align="center"
                      sx={{ mt: 1 }}
                    >
                      Invalid or missing token in URL.
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
