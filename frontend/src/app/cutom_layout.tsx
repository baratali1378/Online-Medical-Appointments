"use client";

import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme"; // Import your custom theme
import { Box, CssBaseline } from "@mui/material";
import Header from "@/components/header/Header";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Render Header only if not on dashboard pages */}
            {!isDashboard && <Header />}

            {/* If Header is shown, add top margin for fixed header */}
            <Box sx={{ mt: !isDashboard ? 14 : 0 }}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Box>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
