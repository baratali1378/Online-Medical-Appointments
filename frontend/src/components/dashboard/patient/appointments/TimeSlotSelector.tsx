import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { format, parseISO } from "date-fns";

export const TimeSlotSelector = ({
  slotsByDay,
  filteredSlots,
  selectedDate,
  selectedSlot,
  isLoading,
  onDateChange,
  onSlotSelect,
}: {
  slotsByDay: Record<string, any>;
  filteredSlots: any[];
  selectedDate: string;
  selectedSlot: string | null;
  isLoading: boolean;
  onDateChange: (date: string) => void;
  onSlotSelect: (slot: string) => void;
}) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
      Select New Appointment
    </Typography>

    {isLoading ? (
      <Box textAlign="center" py={4}>
        <Typography>Loading available slots...</Typography>
      </Box>
    ) : Object.values(slotsByDay).length > 0 ? (
      Object.values(slotsByDay).map((dayGroup: any) => (
        <Paper
          key={dayGroup.date}
          variant="outlined"
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            borderColor:
              selectedDate === dayGroup.date ? "primary.main" : "divider",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ cursor: "pointer" }}
            onClick={() => onDateChange(dayGroup.date)}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              {dayGroup.day} — {dayGroup.dateStr}
            </Typography>
            <Chip
              label={`${dayGroup.slots.length} slots`}
              size="small"
              color={dayGroup.slots.length > 0 ? "success" : "default"}
            />
          </Box>
          <Divider sx={{ my: 1 }} />

          {selectedDate === dayGroup.date && (
            <Grid container spacing={2}>
              {dayGroup.slots.map((slot: any) => {
                const isFull = slot.capacity === 0;
                return (
                  <Grid item xs={6} sm={4} key={slot.id}>
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
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight:
                          selectedSlot === slot.start_time ? 600 : 400,
                      }}
                    >
                      {format(
                        parseISO(`2000-01-01T${slot.start_time}`),
                        "h:mm a"
                      )}{" "}
                      -{" "}
                      {format(
                        parseISO(`2000-01-01T${slot.end_time}`),
                        "h:mm a"
                      )}
                      {isFull && (
                        <Typography
                          variant="caption"
                          display="block"
                          color="error"
                        >
                          Full
                        </Typography>
                      )}
                      {!isFull && (
                        <Typography
                          variant="caption"
                          display="block"
                          color="text.secondary"
                        >
                          {slot.capacity} spots left
                        </Typography>
                      )}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Paper>
      ))
    ) : (
      <Box textAlign="center" py={4}>
        <Typography color="text.secondary">
          No available slots at the moment
        </Typography>
      </Box>
    )}
  </Paper>
);
