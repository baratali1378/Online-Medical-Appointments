"use client";

import { Grid, Typography } from "@mui/material";
import DoctorCard from "@/components/home/sections/topRated/DoctorCard";
import SkeletonCard from "@/components/home/sections/topRated/SkeltonCard";
import { DoctorListItem } from "@/types/doctor";

interface DoctorsListProps {
  doctors?: DoctorListItem[];
  isLoading: boolean;
}

export default function DoctorsList({ doctors, isLoading }: DoctorsListProps) {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!doctors?.length) {
    return (
      <Grid container justifyContent="center" sx={{ py: 4 }}>
        <Typography variant="h6" align="center" color="textSecondary">
          No doctors found.
          <br />
          Don’t worry — the right care is just a moment away.
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} mt={-8}>
      {doctors.map((doctor) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </Grid>
      ))}
    </Grid>
  );
}
