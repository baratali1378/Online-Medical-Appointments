"use client";

import "./globals.css";
import "leaflet/dist/leaflet.css";

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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// ✅ Import font
import { Inter } from "next/font/google";

// ✅ Configure font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // Optional: CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className={inter.className}>
      <body>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {!isDashboard && <Header />}
              <Box sx={{ mt: !isDashboard ? 14 : 0 }}>
                <ErrorBoundary>{children}</ErrorBoundary>
              </Box>
              <ToastContainer position="top-right" autoClose={4000} />
              {!isDashboard && <Footer />}
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
