"use client";

import { useSession } from "next-auth/react";
import { CircularProgress, Alert, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DoctorReviews from "@/components/dashboard/doctor/reviews/DoctorReview/DoctorReviews";
import { useDoctorReviews } from "@/hooks/profile/doctor/useReviews";
import { withAuth } from "@/components/dashboard/withAuth";
export interface Prop {
  session: any;
}

function DashboardPage({ session }: Prop) {
  const token = session?.user?.token || "";

  const { data, isLoading, error } = useDoctorReviews(token || "");

  if (isLoading) {
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

  if (error) return <Alert severity="error">{(error as Error).message}</Alert>;

  if (!data?.data) {
    return (
      <Alert severity="info" variant="filled">
        No reviews yet — once your patients leave feedback, they’ll appear here.
      </Alert>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DoctorReviews data={data.data} />
    </LocalizationProvider>
  );
}

export default withAuth(DashboardPage, "doctor");
