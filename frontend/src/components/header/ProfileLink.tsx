// components/ProfileLink.tsx
"use client";

import Link from "next/link";
import { Avatar } from "@mui/material";

export const ProfileLink = ({ imageUrl }: { imageUrl: string }) => (
  <Link href="/profile" passHref>
    <Avatar
      src={imageUrl || "/default-avatar.png"}
      sx={{
        width: 40,
        height: 40,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: "0 0 0 2px #71C9CE",
        },
      }}
    />
  </Link>
);
