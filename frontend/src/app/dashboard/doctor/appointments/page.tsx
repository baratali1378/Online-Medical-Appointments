"use client";

import { useState, useEffect } from "react";
import { useDoctorAppointmentsQuery } from "@/hooks/profile/doctor/useDoctorAppointmentsQuery";
import { AppointmentFilters, ViewMode } from "@/types/appointments";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Divider,
} from "@mui/material";
import { HeaderSection } from "@/components/dashboard/doctor/appointments/HeaderSection";
import { ControlPanel } from "@/components/dashboard/doctor/appointments/ControlPanel";
import { AppointmentTabsWithCalendar } from "@/components/dashboard/doctor/appointments/AppointmentTabs";
import { useSession } from "next-auth/react";
import { AppointmentViews } from "@/components/dashboard/doctor/appointments/AppointmentViews";

export default function DoctorAppointmentsPage() {
  const [filters, setFilters] = useState<AppointmentFilters>({
    status: "All",
    search: "",
    dateRange: undefined,
  });

  const [view, setView] = useState<ViewMode>("Day View");

  const { data: session, status } = useSession();
  const token = session?.user?.token || "";

  const { data, isLoading, refetch } = useDoctorAppointmentsQuery({
    token,
    filters,
  });

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (data && !hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, [data, hasLoadedOnce]);

  if (status === "loading" || (!hasLoadedOnce && isLoading)) {
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

  if (!session || !token) {
    return (
      <Alert severity="error">
        You must be logged in to view appointments.
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4 } }}>
      {/* Header */}
      <HeaderSection
        fullName={session.user.name || ""}
        url={session.user.image || ""}
        todayCount={data?.meta.count || 0}
      />

      <Divider sx={{ my: { xs: 2, sm: 3 } }} />

      {/* Tabs + Calendar */}
      <AppointmentTabsWithCalendar
        value={view}
        onViewChange={setView}
        filters={filters}
        onFilterChange={setFilters}
      />

      <Divider sx={{ my: { xs: 2, sm: 3 } }} />

      {/* Filters and search */}
      <ControlPanel
        filters={filters}
        onFilterChange={setFilters}
        onRefresh={refetch}
      />

      <Divider sx={{ my: { xs: 2, sm: 3 } }} />

      {/* Appointments content */}
      <AppointmentViews
        appointments={data?.data || []}
        loading={isLoading}
        selectedView={view}
      />
    </Container>
  );
}
