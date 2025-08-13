"use client";

import { useSearchParams } from "next/navigation";
import { useDoctorSearchQuery } from "@/hooks/useSearch";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function DoctorsResults() {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useDoctorSearchQuery({
    city: searchParams.get("city") || "",
    specialty: searchParams.get("specialty") || "",
    searchQuery: searchParams.get("q") || "",
    page: 1,
    pageSize: 10,
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error: {error.message}
      </Typography>
    );
  }

  if (!data?.data?.length) {
    return <Typography sx={{ mt: 4 }}>No doctors found.</Typography>;
  }

  return (
    <Box>
      {data.data.map((doctor) => (
        <Box
          key={doctor.id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
            bgcolor: "white",
          }}
        >
          <Typography variant="h6">{doctor.personal_info.fullname}</Typography>
          <Typography variant="body2" color="text.secondary">
            {doctor.city?.name || "Unknown"} —{" "}
            {doctor.specialties.map((s) => s.name).join(", ")}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
