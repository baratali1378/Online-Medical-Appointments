import React, { useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Card,
  CardActionArea,
} from "@mui/material";
import dayjs from "dayjs";
import { AvailableSlot } from "@/types/slots";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface TimeSlotSelectorProps {
  slots?: AvailableSlot[];
  selectedDate: string;
  selectedSlot: number | null; // store slot.id
  isLoading: boolean;
  onDateChange: (date: string) => void;
  onSlotSelect: (slotId: number) => void;
}

export const TimeSlotSelector = ({
  slots = [],
  selectedDate,
  selectedSlot,
  isLoading,
  onDateChange,
  onSlotSelect,
}: TimeSlotSelectorProps) => {
  const slotsByDay = useMemo(() => {
    return slots.reduce<Record<string, { slots: AvailableSlot[] }>>(
      (acc, slot) => {
        const date = slot.date;
        if (!acc[date]) acc[date] = { slots: [] };
        acc[date].slots.push(slot);
        return acc;
      },
      {}
    );
  }, [slots]);

  const todayStr = dayjs().format("YYYY-MM-DD");

  const isDateDisabled = (dateString: string) =>
    !slotsByDay[dateString]?.slots?.length ||
    dayjs(dateString).isBefore(todayStr, "day");

  const getFirstAvailableDate = () => {
    const availableDates = Object.keys(slotsByDay)
      .filter((date) => slotsByDay[date]?.slots?.length > 0)
      .sort();
    return availableDates.length > 0 ? availableDates[0] : todayStr;
  };

  const currentDate =
    selectedDate && !isDateDisabled(selectedDate)
      ? selectedDate
      : getFirstAvailableDate();

  useEffect(() => {
    if (isDateDisabled(selectedDate)) {
      onDateChange(getFirstAvailableDate());
    }
  }, [slots, selectedDate]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(145deg, #f9fafb, #ffffff)",
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Select Date & Time
      </Typography>

      {isLoading ? (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            Loading available slots...
          </Typography>
        </Box>
      ) : slots.length > 0 ? (
        <>
          <Box sx={{ maxWidth: 300, mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(currentDate)}
                onChange={(newValue) => {
                  if (newValue)
                    onDateChange(dayjs(newValue).format("YYYY-MM-DD"));
                }}
                shouldDisableDate={(date) => {
                  const formatted = dayjs(date).format("YYYY-MM-DD");
                  return isDateDisabled(formatted);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    sx: { backgroundColor: "#fff", borderRadius: 2 },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" alignItems="center" mb={2}>
            <Chip
              label={dayjs(currentDate).format("dddd, MMMM D, YYYY")}
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          </Box>

          <Box>
            {slotsByDay[currentDate]?.slots?.length > 0 ? (
              <Grid container spacing={2}>
                {slotsByDay[currentDate].slots.map((slot) => {
                  const isFull = slot.capacity === 0;
                  const isSelected = selectedSlot === slot.id;
                  const startTime = dayjs(
                    `2000-01-01T${slot.start_time}`
                  ).format("h:mm A");
                  const endTime = dayjs(`2000-01-01T${slot.end_time}`).format(
                    "h:mm A"
                  );

                  let availabilityColor: "success" | "warning" | "error" =
                    "success";
                  if (slot.capacity <= 2 && slot.capacity > 0)
                    availabilityColor = "warning";
                  if (slot.capacity === 0) availabilityColor = "error";

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={slot.id}>
                      <Card
                        elevation={isSelected ? 6 : 2}
                        sx={{
                          borderRadius: 3,
                          border: isSelected ? "2px solid" : "1px solid",
                          borderColor: isSelected ? "primary.main" : "grey.300",
                          transition: "all 0.2s ease",
                          backgroundColor: isSelected
                            ? "primary.main"
                            : "background.paper",
                          "&:hover": { transform: "scale(1.02)", boxShadow: 4 },
                        }}
                      >
                        <CardActionArea
                          onClick={() => !isFull && onSlotSelect(slot.id)} // ✅ send slot.id
                          disabled={isFull}
                          sx={{
                            p: 2,
                            textAlign: "center",
                            color: isSelected
                              ? "white"
                              : isFull
                              ? "text.disabled"
                              : "text.primary",
                          }}
                        >
                          <Typography variant="body1" fontWeight={600}>
                            {startTime} - {endTime}
                          </Typography>
                          <Chip
                            size="small"
                            label={
                              isFull
                                ? "Full"
                                : `${slot.capacity} spot${
                                    slot.capacity > 1 ? "s" : ""
                                  } left`
                            }
                            color={availabilityColor}
                            sx={{
                              mt: 1,
                              backgroundColor:
                                isSelected && !isFull ? "white" : undefined,
                              color:
                                isSelected && !isFull
                                  ? "primary.main"
                                  : undefined,
                            }}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography color="text.secondary">
                No available slots for this date
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <Box textAlign="center" py={4}>
          <Typography color="text.secondary">
            No available slots at the moment
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
