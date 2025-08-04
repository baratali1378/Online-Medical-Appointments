"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Divider,
  Stack,
  Button,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { withAuth } from "@/components/dashboard/withAuth";
import { PatientsTable } from "@/components/dashboard/doctor/patients/PatientsTable";
import { useDoctorPatients } from "@/hooks/profile/doctor/usePatient";

type Props = {
  session: any;
};

function PatientsPage({ session }: Props) {
  const token = session?.user?.token || "";
  const { data, isLoading, refetch } = useDoctorPatients(token);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (data && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [data, hasLoadedOnce]);

  if (!hasLoadedOnce && isLoading) {
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

  const patients = data?.data || [];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      {/* Header Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="h4" fontWeight="bold" color="#71C9CE">
            Patients
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ({patients.length} total)
          </Typography>
        </Stack>
        <IconButton onClick={() => refetch()} color="secondary">
          <RefreshIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Empty State */}
      {patients.length === 0 ? (
        <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              No patients found
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              When patients are assigned to you, they’ll appear here.
            </Typography>
            <Button variant="outlined" onClick={() => refetch} sx={{ mt: 2 }}>
              Refresh
            </Button>
          </CardContent>
        </Card>
      ) : (
        <PatientsTable patients={patients} />
      )}
    </Container>
  );
}

export default withAuth(PatientsPage, "doctor");
