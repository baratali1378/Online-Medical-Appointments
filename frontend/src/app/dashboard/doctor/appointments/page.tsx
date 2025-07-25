"use client";

import { useState, useEffect } from "react";
import { useDoctorAppointmentsQuery } from "@/hooks/profile/doctor/appointment/useDoctorAppointmentsQuery";
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
import { AppointmentViews } from "@/components/dashboard/doctor/appointments/AppointmentViews";
import { format, startOfDay, endOfDay } from "date-fns";
import { withAuth } from "@/components/dashboard/withAuth";

type Props = {
  session: any;
};

function DoctorAppointmentsPage({ session }: Props) {
  const [filters, setFilters] = useState<AppointmentFilters>({
    status: "All",
    search: "",
    dateRange: {
      start: format(startOfDay(new Date()), "yyyy-MM-dd"),
      end: format(endOfDay(new Date()), "yyyy-MM-dd"),
    },
  });

  const [view, setView] = useState<ViewMode>("Day View");

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

      <AppointmentTabsWithCalendar
        value={view}
        onViewChange={setView}
        filters={filters}
        onFilterChange={setFilters}
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

export default withAuth(DoctorAppointmentsPage, "doctor");
