"use client";

import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme'; // Import your custom theme
import { CssBaseline } from "@mui/material";

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
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
