"use client";
import { withAuth } from "@/components/dashboard/withAuth";
import { useDoctorPatient } from "@/hooks/profile/doctor/usePatient";
import { useParams } from "next/navigation";
import PatientDetails from "@/components/dashboard/doctor/patients/PatientDetails";
import { CircularProgress, Box, Alert } from "@mui/material";

type Props = {
  session: any;
};

function PatientPage({ session }: Props) {
  const { id } = useParams();
  const token = session?.user?.token || "";

  const { data, isLoading } = useDoctorPatient(token, id as unknown as number);

  console.log("data3", data);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (!data || !data.data)
    return (
      <Alert color="error" sx={{ mt: 6 }}>
        Patient data not found.
      </Alert>
    );

  return (
    <Box sx={{ px: 2, py: 4 }}>
      <PatientDetails patient={data.data} />
    </Box>
  );
}

export default withAuth(PatientPage, "doctor");
