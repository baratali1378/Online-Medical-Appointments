// components/doctor/DoctorList.tsx
import React from "react";
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Skeleton,
  Avatar,
} from "@mui/material";
import { useDoctorListQuery } from "@/hooks/useTopRated";
import DoctorCard from "./DoctorCard";
import { DoctorListItem } from "@/types/doctor";

const DoctorList = () => {
  const { data, isLoading, error } = useDoctorListQuery();

  // Compact skeleton loader that matches new DoctorCard structure
  const SkeletonCard = () => (
    <Box
      sx={{
        height: "100%",
        maxWidth: 300,
        mx: "auto",
        p: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation="wave"
        />
      </Box>
      <Box sx={{ p: 2, pt: 1 }}>
        <Skeleton
          width="80%"
          height={24}
          animation="wave"
          sx={{ mx: "auto" }}
        />
        <Skeleton
          width="60%"
          height={20}
          animation="wave"
          sx={{ mt: 1, mx: "auto" }}
        />
        <Skeleton
          width="50%"
          height={18}
          animation="wave"
          sx={{ mt: 1, mx: "auto" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Skeleton width={80} height={20} animation="wave" />
          <Skeleton width={40} height={18} animation="wave" sx={{ ml: 1 }} />
        </Box>
      </Box>
    </Box>
  );

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
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorList;
