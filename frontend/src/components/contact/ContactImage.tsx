import React from "react";
import { Card, CardMedia } from "@mui/material";

interface ContactImageProps {
  url?: string;
  alt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const ContactImage: React.FC<ContactImageProps> = ({
  url,
  alt = "Contact",
}) => {
  if (!url) return null;

  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
      <CardMedia
        component="img"
        image={`${API_URL}${url}`}
        alt={alt}
        sx={{ width: "100%", height: "auto", maxHeight: 400 }}
      />
    </Card>
  );
};

export default ContactImage;
