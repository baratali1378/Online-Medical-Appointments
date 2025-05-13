// components/layout/SidebarContent.tsx

"use client";

import { List, ListItem, ListItemText, Divider } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SidebarContent() {
  const { data: session } = useSession(); // Get the user's role from the context
  const role = session?.user.role; // Get the role of the user (Doctor/Patient)

  // Sidebar links based on the user's role
  const links =
    role === "doctor"
      ? [
          { text: "Dashboard", path: "/dashboard/doctor" },
          { text: "Appointments", path: "/dashboard/doctor/appointments" },
          { text: "Profile", path: "/dashboard/doctor/profile" },
        ]
      : [
          { text: "Dashboard", path: "/dashboard/patient" },
          { text: "Appointments", path: "/dashboard/patient/appointments" },
          { text: "Profile", path: "/dashboard/patient/profile" },
        ];

  return (
    <div>
      <List>
        {links.map((item) => (
          <ListItem component={Link} href={item.path} key={item.text}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}
