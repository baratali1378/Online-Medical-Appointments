import { Box, Typography, Pagination } from "@mui/material";
import { Appointment } from "@/types/appointments";
import { AppointmentCard } from "../AppointmentCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";

interface Props {
  appointments: Appointment[];
  emptyMessage: string;
  onRefresh?: () => void;
  token: string;
}

const ITEMS_PER_PAGE = 6;

export const AppointmentListView = ({
  appointments,
  emptyMessage,
  token,
}: Props) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageCount = Math.ceil(appointments.length / ITEMS_PER_PAGE);
  const paginatedAppointments = appointments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (appointments.length === 0) {
    return (
      <Box
        textAlign="center"
        py={{ xs: 6, sm: 8 }}
        px={{ xs: 2, sm: 4 }}
        sx={{ color: "text.primary", opacity: 0.85 }}
      >
        <CalendarMonthIcon
          sx={{
            fontSize: { xs: 48, sm: 60 },
            color: "#71C9CE",
            mb: { xs: 1, sm: 2 },
          }}
        />
        <Typography
          variant="h6"
          mb={{ xs: 2, sm: 3 }}
          fontSize={{ xs: "1rem", sm: "1.25rem" }}
        >
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={{ xs: 2, sm: 3 }}>
      <Box display="flex" flexDirection="column" gap={0.9}>
        {paginatedAppointments.map((appt) => (
          <AppointmentCard token={token} key={appt.id} appointment={appt} />
        ))}
      </Box>

      <Box mt={3} display="flex" flexDirection="column" alignItems="center">
        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#71C9CE",
              borderColor: "#71C9CE",
            },
            "& .Mui-selected": {
              backgroundColor: "#71C9CE",
              color: "#fff",
            },
          }}
        />

        <Typography variant="body2" mt={1} color="text.secondary">
          Page {page} of {pageCount}
        </Typography>
      </Box>
    </Box>
  );
};
