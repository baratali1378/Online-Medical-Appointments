"use client";

import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme"; // Import your custom theme
import { CssBaseline } from "@mui/material";
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider>
            <Header />
            <ErrorBoundary>{children}</ErrorBoundary>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
