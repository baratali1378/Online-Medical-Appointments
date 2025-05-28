"use client";

import { Grid, Typography, Chip, Link, Box } from "@mui/material";
import { VerificationDocument } from "@/types/doctor";

interface VerificationItemProps {
  doc: VerificationDocument;
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const VerificationItem = ({ doc }: VerificationItemProps) => {
  const statusColor =
    doc.current_status === "approved"
      ? "success"
      : doc.current_status === "rejected"
      ? "error"
      : "warning";

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          p: 2,
          border: "1px solid #eee",
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          justifyContent: "space-between",
          alignItems: { sm: "center" },
        }}
      >
        <Typography sx={{ flexBasis: "25%" }} fontWeight={500}>
          {doc.type}
        </Typography>

        <Link
          href={`${API_URL}${doc.file.url}`}
          target="_blank"
          rel="noopener"
          sx={{ flexBasis: "25%" }}
        >
          View Document
        </Link>

        <Chip
          label={doc.current_status}
          color={statusColor}
          sx={{ flexBasis: "25%", textTransform: "capitalize" }}
        />

        <Typography variant="body2" sx={{ flexBasis: "25%" }}>
          {new Date(doc.uploaded_at).toLocaleDateString()}
        </Typography>
      </Box>
    </Grid>
  );
};
