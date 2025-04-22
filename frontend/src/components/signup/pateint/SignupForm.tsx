import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Alert,
  Typography,
  Paper,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { FormikProps } from "formik";
import { SignupFormValues, genderOptions } from "@/types/patient";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NextLink from "next/link";

interface SignupFormProps {
  formik: FormikProps<SignupFormValues>;
  loading: boolean;
  error?: string | null;
  genderOptions: typeof genderOptions;
}

export const SignupForm = ({
  formik,
  loading,
  error,
  genderOptions,
}: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="John Doe"
              {...formik.getFieldProps("fullname")}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname ? formik.errors.fullname : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              placeholder="john@example.com"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email ? formik.errors.email : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              placeholder="+1 234 567 8900"
              {...formik.getFieldProps("phone")}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone ? formik.errors.phone : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ? formik.errors.password : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Gender"
              {...formik.getFieldProps("gender")}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender ? formik.errors.gender : ""}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...formik.getFieldProps("birth")}
            />
          </Grid>

          <Grid item xs={12}>
            <Box position="relative" textAlign="center">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: "#71C9CE",
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: 2,
                  width: "60%",
                }}
              >
                {loading ? "Submitting..." : "Sign Up"}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" textAlign="center" mt={2}>
              Already have an account?{" "}
              <Link
                component={NextLink}
                href="/patient-login"
                color="primary"
                underline="hover"
              >
                Log in here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
