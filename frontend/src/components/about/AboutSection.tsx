import React from "react";
import { Box, Typography, Container, Paper, Grid2 } from "@mui/material";
import MarkdownRenderer from "./MarkdownRenderer";
import { AboutData } from "@/types/about";

interface Props {
  about: AboutData;
}

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const AboutSection: React.FC<Props> = ({ about }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Grid2 container spacing={4} alignItems="center">
          {/* Image */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box
              component="img"
              src={`${BASE_URL}${about.image?.url}`}
              alt={about?.image?.url || "About HealthGate"}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Grid2>

          {/* Text */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Typography
              variant="h3"
              textAlign={"center"}
              fontWeight="bold"
              gutterBottom
              color="#71C9CE"
            >
              {about.title}
            </Typography>

            <MarkdownRenderer content={about.content} />
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default AboutSection;
