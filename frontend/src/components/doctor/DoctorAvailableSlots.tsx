import React from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { AvailableSlot } from "@/types/doctor";
import Slot from "./Slot";

interface Props {
  slots: AvailableSlot[];
  doctorId: number;
}

export default function DoctorAvailableSlots({ slots, doctorId }: Props) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  if (!slots?.length) {
    return (
      <Box my={6} mx={2} display="flex" justifyContent="center">
        <Alert severity="error" variant="outlined" sx={{ maxWidth: 600 }}>
          No available slots right now. Please check again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 4,
        p: { xs: 2, md: 4 },
        bgcolor: "background.paper",
      }}
      elevation={6}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        sx={{
          mb: 4,
          display: "inline-block",
          color: "#71C9CE",
        }}
      >
        Available Time Slots
      </Typography>

      <Grid container spacing={isSmUp ? 4 : 3}>
        {slots.map((slot) => (
          <Grid item xs={12} sm={6} md={4} key={slot.id}>
            <Slot slot={slot} doctorId={doctorId} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
