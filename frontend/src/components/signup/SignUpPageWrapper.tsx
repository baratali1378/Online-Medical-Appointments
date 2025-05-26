"use client";

import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import { ReactNode } from "react";
import Link from "next/link";

interface SignupPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  role?: "doctor" | "patient"; // Add role prop
}

const SignupPageLayout = ({
  title,
  description,
  children,
  maxWidth = "md",
  role = "patient", // Default to patient
}: SignupPageLayoutProps) => {
  const loginPath = role === "doctor" ? "/login/doctor" : "/login/patient";

  return (
    <Container maxWidth={maxWidth} sx={{ py: 5 }}>
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{ letterSpacing: "0.1em", color: "#71C9CE" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          p: { xs: 4, md: 6 },
          transition: "box-shadow 0.3s ease",
          "&:hover": {
            boxShadow: "0 14px 45px rgba(0,0,0,0.18)",
          },
        }}
      >
        {children}
        <Box
          mt={{ xs: 3, md: 5 }}
          textAlign="center"
          sx={{
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.85rem", md: "1rem" },
            }}
          >
            Already have an account?{" "}
            <MuiLink
              component={Link}
              href={loginPath}
              sx={{
                color: "primary.main",
                fontWeight: 600,
                textDecoration: "none",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#008C9E", // a deeper teal for hover
                  textDecoration: "underline",
                },
              }}
            >
              Login here
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPageLayout;
