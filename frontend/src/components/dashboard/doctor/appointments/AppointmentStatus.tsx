import { Box, Chip, Typography } from "@mui/material";
import { format } from "date-fns";

const statusColors: Record<string, any> = {
  Pending: "warning",
  Confirmed: "success",
  Completed: "info",
  Cancelled: "default",
};

// Appointment status display
export const AppointmentStatus = ({
  date,
  status,
  isMobile,
}: {
  date: string;
  status: string;
  isMobile: boolean;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "flex-end",
        gap: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary" whiteSpace="nowrap">
        {format(
          new Date(date),
          isMobile ? "MMM dd, HH:mm" : "MMM dd, yyyy HH:mm"
        )}
      </Typography>
      <Chip
        label={status}
        color={statusColors[status] || "default"}
        size="small"
        sx={{
          minWidth: 80,
          fontWeight: 500,
        }}
      />
    </Box>
  );
};
