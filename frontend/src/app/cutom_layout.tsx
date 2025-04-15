"use client";

import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme'; // Import your custom theme
import { CssBaseline } from "@mui/material";
import Header from "@/components/header/Header";

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
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
