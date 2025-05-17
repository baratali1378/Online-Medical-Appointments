import { IconButton, Stack } from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Telegram,
} from "@mui/icons-material";
import { SocialLink } from "@/types/footer";
import { JSX } from "react";

const platformIcons: Record<string, JSX.Element> = {
  Facebook: <Facebook />,
  Twitter: <Twitter />,
  Instagram: <Instagram />,
  Telegram: <Telegram />,
  LinkedIn: <LinkedIn />,
};

const SocialLinks = ({ links }: { links: SocialLink[] }) => (
  <Stack direction="row" spacing={1} flexWrap="wrap">
    {links.map((link) => (
      <IconButton
        key={link.id}
        component="a"
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          transition: "color 0.3s ease",
          color: "#333",
          "&:hover": {
            color: "#00ACC1",
          },
        }}
        aria-label={link.platform}
      >
        {platformIcons[link.platform] || <></>}
      </IconButton>
    ))}
  </Stack>
);

export default SocialLinks;
