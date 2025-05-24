"use client";

import { Box, Container, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SignupPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const SignupPageLayout = ({
  title,
  description,
  children,
  maxWidth = "md",
}: SignupPageLayoutProps) => {
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
      </Box>
    </Container>
  );
};

export default SignupPageLayout;
