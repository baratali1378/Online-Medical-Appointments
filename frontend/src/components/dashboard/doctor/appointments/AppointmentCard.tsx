import {
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DoctorAppointment } from "@/types/appointments";
import { useState } from "react";
import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { useChangeAppointmentStatus } from "@/hooks/profile/doctor/appointment/useChangeAppointmentStatus";
import { AppointmentActions } from "./AppointmentAction";
import { AppointmentStatus } from "@/components/dashboard/common/AppointmentStatus";
import { PatientInfo } from "./PatientInfo";

interface AppointmentCardProps {
  appointment: DoctorAppointment;
  token: string;
}

export const AppointmentCard = ({
  appointment,
  token,
}: AppointmentCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDetails, setOpenDetails] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const changeStatusMutation = useChangeAppointmentStatus(token);

  const handleStatusChange = (newStatus: string) => {
    changeStatusMutation.mutate({ id: appointment.id, status: newStatus });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="space-between"
          >
            <PatientInfo patient={appointment.patient} apiUrl={API_URL} />

            <AppointmentStatus
              date={appointment.date}
              status={appointment.appointment_status}
              isMobile={isMobile}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: isMobile ? "wrap" : "nowrap",
                justifyContent: isMobile ? "center" : "flex-start",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenDetails(true)}
                fullWidth={isMobile}
                sx={{ whiteSpace: "nowrap" }}
              >
                Details
              </Button>

              <AppointmentActions
                status={appointment.appointment_status}
                onChangeStatus={handleStatusChange}
                isLoading={changeStatusMutation.isPending}
                isMobile={isMobile}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <AppointmentDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        appointment={appointment}
      />
    </>
  );
};
