"use client";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";

interface SignupPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SignupPageLayout = ({
  title,
  description,
  children,
}: SignupPageLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
      bgcolor="#f8f9fa"
    >
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            border: "1px solid #e0e0e0",
            p: isMobile ? 2 : 4,
            backgroundColor: "#ffffff",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight={700}
              align="center"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              mb={4}
            >
              {description}
            </Typography>

            {children}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignupPageLayout;
