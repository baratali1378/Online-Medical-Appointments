// components/doctor/DoctorList.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDoctorListQuery } from "@/hooks/useTopRated";
import DoctorCard from "./DoctorCard";
import { DoctorListItem } from "@/types/doctor";
import SkeletonCard from "./SkeltonCard";

const DoctorList = () => {
  const { data, isLoading, error } = useDoctorListQuery();

  // Compact skeleton loader that matches new DoctorCard structure

  if (isLoading) {
    return (
      <Box py={4}>
        <Grid container spacing={2}>
          {" "}
          {/* Reduced spacing */}
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={`skeleton-${index}`}>
              <SkeletonCard />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error">
          {error.message || "Failed to load doctors. Please try again later."}
        </Typography>
      </Box>
    );
  }

  if (!data?.length) {
    return;
  }

  return (
    <Box py={4}>
      <Grid container spacing={2}>
        {" "}
        {/* Reduced spacing between cards */}
        {data.map((doctor: DoctorListItem) => (
          <Grid item xs={12} sm={6} md={3} key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorList;
