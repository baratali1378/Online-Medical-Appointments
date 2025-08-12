"use client";

import React from "react";
import { Container, Box, Alert } from "@mui/material";
import { useParams } from "next/navigation";
import { useDoctor } from "@/hooks/useDoctor";
import DoctorHeader from "@/components/doctor/DoctorHeader";
import DoctorBiography from "@/components/doctor/DoctorBiography";
import DoctorAvailableSlots from "@/components/doctor/DoctorAvailableSlots";
import DoctorReviews from "@/components/doctor/DoctorReviews";
import Loading from "@/app/loading";

export default function DoctorDetailsPage() {
  const params = useParams();
  const doctorId = params?.id as string;

  const { data, isLoading, isError } = useDoctor(doctorId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data?.doctor) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "linear-gradient(135deg, #f85032 0%, #e73827 100%)",
        }}
      >
        <Container maxWidth="sm">
          <Alert severity="error" sx={{ my: 4, fontSize: "1.2rem" }}>
            Could not load doctor information. Please try again later.
          </Alert>
        </Container>
      </Box>
    );
  }

  const doctor = data.doctor;
  const rating = data?.rating ?? 0;
  const reviewCount = data?.reviewCount ?? doctor?.reviews?.length ?? 0;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <DoctorHeader
          doctor={doctor}
          rating={rating}
          reviewCount={reviewCount}
        />

        <Box sx={{ mt: 3 }}>
          <DoctorBiography
            biography={doctor.biography}
            clinicInfo={doctor.clinic_info}
          />
        </Box>
        <Box mt={4}>
          <DoctorAvailableSlots
            slots={doctor.available_slots || []}
            doctorId={doctor.id}
          />
        </Box>

        <Box mt={6}>
          <DoctorReviews reviews={doctor.reviews || []} />
        </Box>
      </Container>
    </Box>
  );
}
