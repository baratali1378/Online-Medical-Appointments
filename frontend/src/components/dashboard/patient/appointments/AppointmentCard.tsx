"use client";

import {
  Box,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { PatientAppointment } from "@/types/appointments";
import { useChangePatientAppointmentStatus } from "@/hooks/profile/patient/appointment/useChangeAppointmentStatus";
import { AppointmentStatus } from "@/components/dashboard/common/AppointmentStatus";
import { DoctorInfo } from "./DoctorInfo";
import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";
import { ReviewDialog } from "./ReviewDialog";

interface Props {
  appointment: PatientAppointment;
  token: string;
}

const paymentColors: Record<
  string,
  "default" | "success" | "warning" | "error"
> = {
  Paid: "success",
  Unpaid: "warning",
  Failed: "error",
};

export const PatientAppointmentCard = ({ appointment, token }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDetails, setOpenDetails] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const changeStatusMutation = useChangePatientAppointmentStatus(token);

  const handleStatusChange = (newStatus: string) => {
    changeStatusMutation.mutate({ id: appointment.id, status: newStatus });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: "0px 3px 10px rgba(0,0,0,0.08)",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Stack spacing={2}>
            {/* Doctor Info */}
            <DoctorInfo doctor={appointment.doctor} />

            <Divider />

            {/* Status + Date */}
            <AppointmentStatus
              date={appointment.date}
              status={appointment.appointment_status}
              isMobile={isMobile}
            />

            <Divider />

            {/* Price + Payment */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {appointment.price
                    ? `$${appointment.price.toFixed(2)}`
                    : "Not Set"}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography variant="subtitle2" color="text.secondary">
                  Payment
                </Typography>
                <Chip
                  label={appointment.payment_status}
                  color={paymentColors[appointment.payment_status] || "default"}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
            </Stack>

            <Divider />

            {/* Action Buttons */}
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={1.5}
              justifyContent="flex-end"
            >
              {appointment.appointment_status === "Completed" && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setOpenReviewDialog(true)}
                  fullWidth={isMobile}
                  sx={{
                    background: "linear-gradient(135deg, #4CAF50, #81C784)",
                    color: "#ffffff",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(135deg, #43A047, #66BB6A)",
                    },
                  }}
                >
                  Leave Review
                </Button>
              )}

              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpenDetails(true)}
                fullWidth={isMobile}
              >
                View Details
              </Button>

              {appointment.appointment_status === "Pending" && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleStatusChange("Cancelled")}
                  fullWidth={isMobile}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <AppointmentDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        appointment={appointment}
        token={token}
      />

      {/* Review Dialog */}
      <ReviewDialog
        open={openReviewDialog}
        onClose={() => setOpenReviewDialog(false)}
        appointment={appointment}
        token={token}
      />
    </>
  );
};
