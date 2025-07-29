"use client";

import { useState, useEffect } from "react";
import { usePatientAppointmentsQuery } from "@/hooks/profile/patient/appointment/useAppointmentsQuery";
import { AppointmentFilters, ViewMode } from "@/types/appointments";

import { Box, CircularProgress, Container, Divider } from "@mui/material";

import { HeaderSection } from "@/components/dashboard/patient/appointments/HeaderSection";
import { ControlPanel } from "@/components/dashboard/patient/appointments/ControlPanel";
import { AppointmentViews } from "@/components/dashboard/patient/appointments/AppointmentViews";

import { withAuth } from "@/components/dashboard/withAuth";

type Props = {
  session: any;
};

function PatientAppointmentsPage({ session }: Props) {
  const [filters, setFilters] = useState<AppointmentFilters>({
    status: "All",
    search: "",
  });

  const [view, setView] = useState<ViewMode>("List View");

  const token = session?.user?.token || "";

  const { data, isLoading, refetch } = usePatientAppointmentsQuery({
    token,
    filters,
  });

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

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      <HeaderSection
        fullName={session.user.name || ""}
        url={session.user.image || ""}
        todayCount={data?.meta.count || 0}
      />

      <Divider sx={{ my: { xs: 2, sm: 3 } }} />

      <ControlPanel
        filters={filters}
        onFilterChange={setFilters}
        onRefresh={refetch}
      />

      <Divider sx={{ my: { xs: 2, sm: 3 } }} />

      <AppointmentViews
        appointments={data?.data || []}
        loading={isLoading}
        selectedView={view}
        token={token}
      />
    </Container>
  );
}

export default withAuth(PatientAppointmentsPage, "patient");
