// components/doctor/Slot.tsx
import React from "react";
import {
  Card,
  Button,
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

// Helper to format time in 12-hour format with AM/PM
function formatTime(time: string) {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 to 12 for midnight
  return `${hour}:${minute} ${ampm}`;
}

interface Props {
  slot: AvailableSlot & { date?: string }; // date optional ISO string
}

export default function Slot({ slot }: Props) {
  const theme = useTheme();

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
      displayDate = format(parsedDate, "EEE, MMM d, yyyy"); // e.g. Wed, Aug 12, 2025
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

        <Stack direction="row" spacing={1.5} alignItems="center">
          <AccessTimeIcon color="primary" fontSize="medium" />
          <Typography variant="subtitle1" fontWeight={600}>
            {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
          </Typography>
        </Stack>

        <Divider />

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
      </Stack>
      <Box mt={2}>
        <BrandButton fullWidth>Book Appointment</BrandButton>
      </Box>
    </Card>
  );
}
