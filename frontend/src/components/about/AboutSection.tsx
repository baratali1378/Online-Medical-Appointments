import React from "react";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import MarkdownRenderer from "./MarkdownRenderer";
import { AboutData } from "@/types/strapi";

interface Props {
  about: AboutData;
}

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const AboutSection: React.FC<Props> = ({ about }) => {
  const imageUrl = about.image?.formats?.medium?.url || about.image?.url || "";
  const fullImageUrl = `${BASE_URL}${imageUrl}`;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Image */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={fullImageUrl}
              alt={about.image?.alternativeText || "About HealthGate"}
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Text */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              textAlign={"center"}
              fontWeight="bold"
              gutterBottom
            >
              {about.title}
            </Typography>

            <MarkdownRenderer content={about.content} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AboutSection;
