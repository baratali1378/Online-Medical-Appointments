import RootLayout from "./cutom_layout";

export const metadata = {
  title: {
    default: "Online Oppointments System",
    template: "%s",
  },
  description: "Created by Barat Ali Hassanzada.",
  keywords: ["Booking", "Doctor", "Patient", "Online Oppointment System"],
  icons: [
    { rel: "icon", type: "image/png", sizes: "300x300", url: "/logo.png" },
  ],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout children={children} />;
}