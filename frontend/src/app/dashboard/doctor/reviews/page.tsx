"use client";

import { useSession } from "next-auth/react";
import { CircularProgress, Alert, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DoctorReviews from "@/components/dashboard/doctor/reviews/DoctorReview/DoctorReviews";
import { useDoctorReviews } from "@/hooks/profile/doctor/useReviews";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const { data, isLoading, error } = useDoctorReviews(token || "");

  if (status === "loading" || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!session || !token)
    return <Alert severity="error">You must be logged in.</Alert>;

  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;

  if (!data) return <Alert severity="error">No review data found.</Alert>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DoctorReviews data={data.data} />
    </LocalizationProvider>
  );
}
