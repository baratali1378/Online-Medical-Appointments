import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "رزرو آنلاین دکتر",
  description: "created by Baratali Hassanzada",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
