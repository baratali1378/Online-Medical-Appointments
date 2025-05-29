"use client";

import { Box, Container, Grid2, Typography } from "@mui/material";
import { useFooter } from "@/hooks/useFooter";
import FooterSection from "./FooterSection";
import UsefulLinks from "./UsefulLinks";
import SocialLinks from "../common/SocialLinks";
import { Poppins } from "next/font/google";

// Importing Google Font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer = () => {
  const { data, isLoading } = useFooter();

  if (isLoading || !data) return null;

  console.log("fotter", data);

  return (
    <Box
      component="footer"
      className={poppins.className}
      sx={{
        backgroundColor: "#f5f5f5",
        py: { xs: 6, md: 10 },
        mt: 10,
        fontFamily: poppins.style.fontFamily,
      }}
    >
      <Container maxWidth="lg">
        <Grid2
          container
          spacing={{ xs: 4, sm: 6 }}
          direction={{ xs: "column", md: "row" }}
        >
          {/* Company Info */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FooterSection title={data.company_name}>
              <Box
                component="img"
                src={data.logo.url}
                alt="logo"
                sx={{
                  width: { xs: 140, sm: 160, md: 180 },
                  mb: 2,
                  borderRadius: 2,
                }}
              />
              <Typography variant="body2" sx={{ maxWidth: 360 }}>
                {data.description}
              </Typography>
            </FooterSection>
          </Grid2>

          {/* Links */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FooterSection title="Useful Links">
              <UsefulLinks links={data.useful_links} />
            </FooterSection>
            <FooterSection title="Social">
              <SocialLinks links={data.social_links} />
            </FooterSection>
          </Grid2>

          {/* Contact */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FooterSection title="Contact">
              <Typography variant="body2" mb={1}>
                <strong>Address:</strong> {data.address}
              </Typography>
              <Typography variant="body2" mb={1}>
                <strong>Email:</strong> {data.email}
              </Typography>

              <Typography variant="body1" mb={1}>
                <strong>Phone:</strong>
              </Typography>
              {data.phone_number.map((phone) => (
                <Typography key={phone.id} variant="body2">
                  {phone.text.startsWith("+93")
                    ? `Home:  ${phone.text}`
                    : `Office: ${phone.text}`}
                </Typography>
              ))}
            </FooterSection>
          </Grid2>
        </Grid2>

        <Box mt={5} textAlign="center">
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              mt: 2,
            }}
          >
            &copy; {new Date().getFullYear()} {data.company_name}. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
