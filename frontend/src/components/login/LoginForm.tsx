"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { DynamicForm } from "@/components/forms/DynamicForm";
import { loginFormFields } from "@/components/constant/FormConstant";
import { loginValidation } from "@/utils/validation";

interface LoginFormProps {
  handleSubmit: (values: { email: string; password: string }) => Promise<{
    success: boolean;
    message?: string;
  }>;
  signupLink: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, signupLink }) => {
  const theme = useTheme();
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const res = await handleSubmit(values);
      setResult(res);
    } catch (err) {
      setResult({ success: false, message: "Login failed. Please try again." });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        padding: { xs: 2, md: 0 },
      }}
    >
      <Typography
        color={theme.palette.text.disabled}
        textAlign="center"
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
      >
        Login
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        gutterBottom
        sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" } }}
      >
        Welcome back! Please log in to your account.
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <>
            <DynamicForm
              formik={formik}
              fields={loginFormFields}
              loading={formik.isSubmitting}
              buttonLabel="Login"
            />

            {result && !result.success && (
              <Typography
                color="error"
                textAlign="center"
                sx={{ mt: 2, fontSize: { xs: "0.75rem", sm: "0.9rem" } }}
              >
                {result.message}
              </Typography>
            )}
          </>
        )}
      </Formik>

      <Typography
        textAlign="center"
        sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" }, mt: 2 }}
      >
        Don’t have an account?{" "}
        <Link
          href={signupLink}
          style={{
            color: theme.palette.primary.main,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Sign up
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
