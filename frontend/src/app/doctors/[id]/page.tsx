"use client";

import {
  Container,
  Box,
  Grid,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useDoctor } from "@/hooks/useDoctor";
import DoctorHeader from "@/components/doctor/DoctorHeader";
import DoctorProfileCard from "@/components/doctor/DoctorProfileCard";
import DoctorBiography from "@/components/doctor/DoctorBiography";
import DoctorAvailableSlots from "@/components/doctor/DoctorAvailableSlots";
import DoctorReviews from "@/components/doctor/DoctorReviews";

export default function DoctorDetailsPage() {
  const params = useParams();
  const doctorId = params?.id as string;

  const { data, isLoading, isError } = useDoctor(doctorId);

  if (!isLoading) console.log(data);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.doctor) {
    return (
      <Container>
        <Alert severity="error">
          Could not load doctor information. Please try again later.
        </Alert>
      </Container>
    );
  }

  const doctor = data.doctor;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <DoctorHeader doctor={doctor} />

      <Grid container spacing={4} mt={2}>
        {/* Left: Profile & contact */}
        <Grid item xs={12} md={4}>
          <DoctorProfileCard doctor={doctor} />
        </Grid>

        {/* Right: Bio & slots */}
        <Grid item xs={12} md={8}>
          <DoctorBiography
            biography={doctor.biography}
            clinicInfo={doctor.clinic_info}
          />
          <Box mt={4}>
            <DoctorAvailableSlots
              slots={doctor.available_slots}
              doctorId={doctor.id}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Reviews */}
      <Box mt={6}>
        <DoctorReviews reviews={doctor.reviews} />
      </Box>
    </Container>
  );
}
