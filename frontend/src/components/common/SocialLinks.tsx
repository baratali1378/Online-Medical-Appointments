import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import { SocialLink } from "@/types/footer";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  Telegram,
  Language,
} from "@mui/icons-material";

const getSocialIcon = (platform: string) => {
  const key = platform.toLowerCase();
  switch (key) {
    case "facebook":
      return <Facebook />;
    case "instagram":
      return <Instagram />;
    case "linkedin":
      return <LinkedIn />;
    case "twitter":
    case "x":
      return <Twitter />;
    case "telegram":
      return <Telegram />;
    default:
      return <Language />;
  }
};

interface Props {
  links?: SocialLink[];
}

const SocialLinks: React.FC<Props> = ({ links }) => {
  if (!links) return null;
  else
    return (
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {links.map(({ id, platform, url }) => (
          <Tooltip key={id} title={platform} arrow>
            <IconButton
              key={id}
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                transition: "color 0.3s ease",
                color: "#333",
                "&:hover": {
                  color: "#00ACC1",
                },
              }}
              aria-label={platform}
            >
              {getSocialIcon(platform)}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    );
};

export default SocialLinks;
