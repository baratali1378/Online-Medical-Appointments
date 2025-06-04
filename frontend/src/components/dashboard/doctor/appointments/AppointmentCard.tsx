// components/AppointmentCard.tsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import { Appointment } from "@/types/appointments";
import { format } from "date-fns";
import { useState } from "react";
import { AppointmentDetailsDialog } from "./AppointmentDetailsDialog";

interface AppointmentCardProps {
  appointment: Appointment;
}

const statusColors: Record<string, any> = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "info",
  Cancelled: "default",
};

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const { patient, date, appointment_status } = appointment;
  const age =
    new Date().getFullYear() - new Date(patient.birth || "2000").getFullYear();

  return (
    <>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Patient Info */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={`${API_URL}${patient.image?.url}` || "/default-avatar.png"}
              alt={patient.fullname || "Patient"}
            />
            <Box>
              <Typography fontWeight={600}>
                {patient.fullname || "Unnamed"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {age} yrs / {patient.gender || "N/A"}
              </Typography>
            </Box>
          </Box>

          {/* Appointment Date & Status */}
          <Box textAlign="center">
            <Typography variant="body1">
              {format(new Date(date), "MMM dd, yyyy HH:mm")}
            </Typography>
            <Chip
              label={appointment_status}
              color={statusColors[appointment_status] || "default"}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>

          {/* Action Buttons */}
          <Box display="flex" gap={1} flexWrap="wrap">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenDetails(true)}
            >
              View Details
            </Button>

            {appointment_status === "Pending" && (
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: "#FFA000",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#FF8F00" },
                }}
              >
                Confirm
              </Button>
            )}

            {appointment_status === "Confirmed" && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "#D32F2F", // Red color
                    color: "#fff",
                    "&:hover": { backgroundColor: "#B71C1C" }, // Darker red on hover
                  }}
                >
                  Cancel
                </Button>
                <Button size="small" variant="contained" color="success">
                  Start Consultation
                </Button>
              </>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <AppointmentDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        appointment={appointment}
      />
    </>
  );
};
