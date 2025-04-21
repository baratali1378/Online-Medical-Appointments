"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Link,
} from "@mui/material";
import {
  LocationOn,
  Email,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import { ContactData } from "@/types/contact";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

interface ContactInfoProps {
  contact: ContactData;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  const imageUrl = contact.image?.formats?.medium?.url
    ? `http://localhost:1337${contact.image.formats.medium.url}`
    : "";

  return (
    <>
      <Head>
        {/* Google Font Import */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
        />
      </Head>

      <Box mt={6} mb={6} sx={{ fontFamily: "'Poppins', sans-serif" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Image */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              {imageUrl && (
                <CardMedia
                  component="img"
                  image={imageUrl}
                  alt="Contact HealthGate"
                  sx={{ width: "100%", height: "auto", maxHeight: 400 }}
                />
              )}
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              color="#71C9CE"
              gutterBottom
              sx={{
                fontWeight: "600",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Contact Us
            </Typography>

            <Box display="flex" alignItems="center" mb={2}>
              <LocationOn sx={{ mr: 1 }} color="primary" />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                {contact.address}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <Phone sx={{ mr: 1 }} color="primary" />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                {contact.phone}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={3}>
              <Email sx={{ mr: 1 }} color="primary" />
              <Typography sx={{ fontFamily: "'Poppins', sans-serif" }}>
                {contact.email}
              </Typography>
            </Box>

            {/* Social Links */}
            <Box>
              {contact.facebook && (
                <IconButton
                  component={Link}
                  href={contact.facebook}
                  target="_blank"
                >
                  <Facebook />
                </IconButton>
              )}
              {contact.twitter && (
                <IconButton
                  component={Link}
                  href={contact.twitter}
                  target="_blank"
                >
                  <Twitter />
                </IconButton>
              )}
              {contact.instagram && (
                <IconButton
                  component={Link}
                  href={contact.instagram}
                  target="_blank"
                >
                  <Instagram />
                </IconButton>
              )}
              {contact.linkedin && (
                <IconButton
                  component={Link}
                  href={contact.linkedin}
                  target="_blank"
                >
                  <LinkedIn />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactInfo;
