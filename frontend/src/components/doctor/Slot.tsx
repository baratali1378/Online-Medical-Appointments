"use client";

import React from "react";
import {
  Card,
  Stack,
  Typography,
  Chip,
  Divider,
  useTheme,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { format, parseISO, isToday, isTomorrow } from "date-fns";
import type { AvailableSlot } from "@/types/doctor";
import { BrandButton } from "../dashboard/common/BrandButton";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useCreateAppointment } from "@/hooks/useAppointment";

// Helper to format time in 12-hour format with AM/PM
function formatTime(time: string) {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 to 12 for midnight
  return `${hour}:${minute} ${ampm}`;
}

interface Props {
  slot: AvailableSlot & { date?: string };
  doctorId: number;
}

export default function Slot({ slot, doctorId }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log("slot", session);

  // Hook to create appointment via Stripe
  const createAppointmentMutation = useCreateAppointment(
    session?.user.token || ""
  );

  // Handle booking
  const handleBook = async () => {
    if (!session) {
      // Redirect to login with callbackUrl
      router.push(`/login/patient?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      await createAppointmentMutation.mutateAsync({
        doctorId,
        slotId: Number(slot.id),
        price: slot.price ?? 0, // Stripe requires a price
      });
    } catch (err) {
      console.error("Failed to book appointment:", err);
    }
  };

  // Keep original date display logic
  let displayDate: React.ReactNode = slot.days;
  if (slot.date) {
    const parsedDate = parseISO(slot.date);
    if (isToday(parsedDate)) {
      displayDate = (
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.success.main}
          sx={{ userSelect: "none" }}
        >
          Today — {format(parsedDate, "MMM d, yyyy")}
        </Typography>
      );
    } else if (isTomorrow(parsedDate)) {
      displayDate = (
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.warning.main}
          sx={{ userSelect: "none" }}
        >
          Tomorrow — {format(parsedDate, "MMM d, yyyy")}
        </Typography>
      );
    } else {
      displayDate = format(parsedDate, "EEE, MMM d, yyyy");
    }
  }

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        boxShadow: 3,
        transition: "all 0.3s ease",
        cursor: slot.is_active ? "pointer" : "not-allowed",
        backgroundColor: slot.is_active
          ? theme.palette.background.paper
          : theme.palette.action.disabledBackground,
        "&:hover": slot.is_active
          ? {
              transform: "translateY(-6px)",
              boxShadow: 8,
              backgroundColor: theme.palette.action.hover,
            }
          : {},
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
      }}
      elevation={6}
    >
      <Stack spacing={2}>
        {/* Date Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 0.5,
            bgcolor: theme.palette.mode === "light" ? "#e3f2fd" : "#1565c0",
            px: 2,
            py: 1,
            borderRadius: 2,
            color: theme.palette.mode === "light" ? "#1565c0" : "#e3f2fd",
            userSelect: "none",
          }}
        >
          <CalendarMonthIcon fontSize="medium" />
          {typeof displayDate === "string" ? (
            <Typography variant="h6" fontWeight={700} noWrap>
              {displayDate}
            </Typography>
          ) : (
            displayDate
          )}
          <Chip
            label={slot.is_active ? "Open" : "Inactive"}
            color={slot.is_active ? "success" : "default"}
            size="small"
            sx={{ fontWeight: "bold", ml: "auto" }}
          />
        </Box>

        <Divider />

        {/* Time Section */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <AccessTimeIcon color="primary" fontSize="medium" />
          <Typography variant="subtitle1" fontWeight={600}>
            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
          </Typography>
        </Stack>

        <Divider />

        {/* Capacity + Price */}
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          flexWrap="wrap"
        >
          <Chip
            label={`Capacity: ${slot.capacity ?? "Unlimited"}`}
            color={
              slot.capacity !== undefined && Number(slot.capacity) <= 5
                ? "warning"
                : "secondary"
            }
            variant="outlined"
            sx={{ fontWeight: "bold", maxWidth: 160 }}
          />
          {slot.price !== null && (
            <Chip
              label={`${slot.price} AFN`}
              color="success"
              sx={{ fontWeight: "bold", fontSize: "0.95rem" }}
            />
          )}
        </Stack>
      </Stack>

      {/* Book Button */}
      <Box mt={2}>
        <BrandButton
          onClick={handleBook}
          fullWidth
          disabled={!slot.is_active || createAppointmentMutation.isPending}
        >
          {createAppointmentMutation.isPending
            ? "Redirecting..."
            : "Book Appointment"}
        </BrandButton>
      </Box>
    </Card>
  );
}
