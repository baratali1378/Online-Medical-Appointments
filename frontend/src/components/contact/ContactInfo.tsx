"use client";

import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { LocationOn, Email, Phone } from "@mui/icons-material";
import { ContactData } from "@/types/contact";
import ContactImage from "./ContactImage";
import ContactDetailItem from "./ContactDetailItem";
import SocialMediaIcons from "@/components/common/SocialLinks";

import { Poppins } from "next/font/google";

// Load the Google Font using next/font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

interface ContactInfoProps {
  contact: ContactData;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  return (
    <Box mt={6} mb={6} className={poppins.className}>
      <Grid2 container spacing={4} alignItems="center">
        <Grid2 size={{ xs: 12, md: 6 }}>
          <ContactImage url={contact.image?.url} alt="Contact HealthGate" />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            color="#71C9CE"
            gutterBottom
            sx={{ fontWeight: "600" }}
          >
            Contact Us
          </Typography>

          <ContactDetailItem icon={LocationOn} text={contact.address} />
          <ContactDetailItem icon={Phone} text={contact.phone} />
          <ContactDetailItem icon={Email} text={contact.email} />

          <Box mt={2}>
            <SocialMediaIcons links={contact.social_medias || []} />
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ContactInfo;
