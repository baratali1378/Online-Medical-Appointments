"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

const DoctorDetailPage = () => {
  const params = useParams();
  const doctorId = params?.id as string;

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={600}>
        Doctor Detail - {doctorId}
      </Typography>
      <Typography variant="body1" mt={2}>
        Here you can fetch and display doctor details using the ID.
      </Typography>
    </Box>
  );
};

export default DoctorDetailPage;
