"use client";

import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme"; // Import your custom theme
import { Box, CssBaseline } from "@mui/material";
import Header from "@/components/header/Header";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Header />
            {/* Add margin-top to account for the fixed header */}
            <Box sx={{ mt: 14 }}>
              {" "}
              {/* Adjust mt to match your header height */}
              <ErrorBoundary>{children}</ErrorBoundary>
            </Box>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
