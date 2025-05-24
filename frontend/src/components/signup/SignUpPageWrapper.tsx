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
    <Container maxWidth={maxWidth} sx={{ py: 3 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          boxShadow: 1,
          p: { xs: 3, md: 4 },
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default SignupPageLayout;
