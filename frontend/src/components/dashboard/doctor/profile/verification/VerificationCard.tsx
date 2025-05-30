"use client";

import { Grid, Typography, Box, Divider } from "@mui/material";
import { BaseCard } from "@/components/dashboard/common/Card";
import { VerificationDocument } from "@/types/doctor";
import { UploadVerificationForm } from "./UploadVerificationForm";
import { VerificationItem } from "./VerificationItem";

interface VerificationCardProps {
  verifications: VerificationDocument[];
  onUploadVerification: (file: File, type: string) => Promise<void>;
  isUploading: boolean;
  uploadError?: string | null;
}

export const VerificationCard = ({
  verifications,
  onUploadVerification,
}: VerificationCardProps) => {
  return (
    <BaseCard title="Document Verification">
      <Box mb={3}>
        {verifications.length === 0 ? (
          <Typography>No verification documents uploaded yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {verifications.map((doc) => (
              <VerificationItem key={doc.id} doc={doc} />
            ))}
          </Grid>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Upload a New Document
      </Typography>

      <UploadVerificationForm onUpload={onUploadVerification} />
    </BaseCard>
  );
};
