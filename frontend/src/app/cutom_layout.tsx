"use client";

import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import { Box, CssBaseline } from "@mui/material";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  // Initialize QueryClient once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              {!isDashboard && <Header />}

              <Box sx={{ mt: !isDashboard ? 14 : 0 }}>
                <ErrorBoundary>{children}</ErrorBoundary>
              </Box>

              {!isDashboard && <Footer />}
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
