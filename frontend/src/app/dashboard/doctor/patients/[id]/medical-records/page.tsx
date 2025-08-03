"use client";

import React from "react";
import { Container, Typography } from "@mui/material";
import { withAuth } from "@/components/dashboard/withAuth";
import { MedicalRecordsContainer } from "@/components/dashboard/doctor/medical/MedicalRecordsContainer";
import { useParams } from "next/navigation";

interface Prop {
  session: any;
}

const MedicalRecordsPage = ({ session }: Prop) => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        color="#71C9CE"
        fontWeight="bold"
        align="center"
        gutterBottom
      >
        🏥 Patient Medical Records
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        gutterBottom
      >
        Review, filter, and manage patient records efficiently.
      </Typography>

      <MedicalRecordsContainer
        token={session?.user?.token || ""}
        patientId={id as unknown as number}
      />

      <Typography
        variant="caption"
        mt={4}
        display="block"
        align="center"
        color="text.secondary"
      >
        📝 Click a row to view details. Use filters to narrow your search.
      </Typography>
    </Container>
  );
};

export default withAuth(MedicalRecordsPage, "doctor");
