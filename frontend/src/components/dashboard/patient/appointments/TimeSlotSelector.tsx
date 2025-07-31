import React, { useEffect } from "react";
import { Box, Typography, Grid, Button, Paper, TextField } from "@mui/material";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

interface Slot {
  id: string;
  start_time: string;
  capacity: number;
}

interface TimeSlotSelectorProps {
  slotsByDay: Record<string, { slots: Slot[] }>;
  selectedDate: string;
  selectedSlot: string | null;
  isLoading: boolean;
  onDateChange: (date: string) => void;
  onSlotSelect: (slot: string) => void;
}

export const TimeSlotSelector = ({
  slotsByDay,
  selectedDate,
  selectedSlot,
  isLoading,
  onDateChange,
  onSlotSelect,
}: TimeSlotSelectorProps) => {
  const todayStr = dayjs().format("YYYY-MM-DD");

  // Helper: find first date with slots
  const getFirstAvailableDate = () => {
    const availableDates = Object.keys(slotsByDay).filter(
      (date) =>
        slotsByDay[date]?.slots?.length > 0 && dayjs(date).isAfter(todayStr)
    );
    return availableDates.length > 0 ? availableDates[0] : todayStr;
  };

  // Ensure selectedDate is valid and has slots, else fallback to first available
  const currentDate =
    selectedDate && slotsByDay[selectedDate]?.slots?.length > 0
      ? selectedDate
      : getFirstAvailableDate();

  // Disable dates without available slots or in the past
  const isDateDisabled = (dateString: string) => {
    return (
      !slotsByDay[dateString]?.slots?.length ||
      dayjs(dateString).isBefore(todayStr, "day")
    );
  };

  // When date changes in input, only update if date has slots and is not disabled
  const handleDateChange = (newDate: string) => {
    if (!isDateDisabled(newDate)) {
      onDateChange(newDate);
    }
  };

  // In case slotsByDay or selectedDate changes externally, sync to valid date
  useEffect(() => {
    if (isDateDisabled(selectedDate)) {
      onDateChange(getFirstAvailableDate());
    }
  }, [slotsByDay, selectedDate]);

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Select Date & Time
      </Typography>

      {isLoading ? (
        <Box textAlign="center" py={4}>
          <Typography>Loading available slots...</Typography>
        </Box>
      ) : Object.keys(slotsByDay).length > 0 ? (
        <>
          {/* Date input */}
          <Box sx={{ maxWidth: 320, mb: 3 }}>
            <TextField
              type="date"
              fullWidth
              value={currentDate}
              onChange={(e) => handleDateChange(e.target.value)}
              InputProps={{
                inputProps: {
                  min: todayStr,
                },
              }}
              helperText={
                isDateDisabled(currentDate)
                  ? "No slots available on this date"
                  : ""
              }
              error={isDateDisabled(currentDate)}
            />
          </Box>

          {/* Show the selected date in readable format */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {dayjs(currentDate).format("dddd, MMMM D, YYYY")}
          </Typography>

          {/* Slots for Selected Date */}
          <Box>
            {slotsByDay[currentDate]?.slots?.length > 0 ? (
              <Grid container spacing={1}>
                {slotsByDay[currentDate].slots.map((slot) => {
                  const isFull = slot.capacity === 0;
                  return (
                    <Grid item xs={6} sm={4} md={3} key={slot.id}>
                      <Button
                        fullWidth
                        variant={
                          selectedSlot === slot.start_time
                            ? "contained"
                            : "outlined"
                        }
                        color={isFull ? "inherit" : "primary"}
                        disabled={isFull}
                        onClick={() => !isFull && onSlotSelect(slot.start_time)}
                        sx={{
                          py: 1,
                          borderRadius: 2,
                          fontSize: "0.8rem",
                          fontWeight:
                            selectedSlot === slot.start_time ? 600 : 400,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {dayjs(`2000-01-01T${slot.start_time}`).format(
                          "h:mm a"
                        )}
                      </Button>
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
