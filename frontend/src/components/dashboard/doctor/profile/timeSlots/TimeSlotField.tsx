"use client";

import {
  Grid,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TimeSlotFieldProps } from "@/types/slots";

export const TimeSlotField = ({
  index,
  slot,
  timeOptions,
  daysOfWeek,
  handleChange,
  setFieldValue,
  remove,
  loading,
  isLastSlot,
}: TimeSlotFieldProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Convert backend time format (HH:mm:ss.SSS) to input format (HH:mm)
  const formatTimeForInput = (timeString: string) => {
    return timeString ? timeString.slice(0, 5) : "";
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: theme.shadows[1],
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Time Slot #{index + 1}
          </Typography>
          <IconButton
            color="error"
            onClick={() => remove(index)}
            disabled={isLastSlot || loading}
          >
            <Delete />
          </IconButton>
        </Box>

        <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
          {/* Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              fullWidth
              label="Date"
              name={`available_slots[${index}].date`}
              value={slot.date}
              onChange={handleChange}
              size="small"
              disabled={loading}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: "2099-12-31", // Prevent dates too far in the future
              }}
            />
          </Grid>

          {/* Start Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              fullWidth
              label="Start Time"
              name={`available_slots[${index}].start_time`}
              value={formatTimeForInput(slot.start_time)}
              onChange={(e) =>
                setFieldValue(
                  `available_slots[${index}].start_time`,
                  e.target.value
                )
              }
              size="small"
              disabled={loading}
              inputProps={{
                step: 900, // 15 minute intervals
              }}
            />
          </Grid>

          {/* End Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              fullWidth
              label="End Time"
              name={`available_slots[${index}].end_time`}
              value={formatTimeForInput(slot.end_time)}
              onChange={(e) =>
                setFieldValue(
                  `available_slots[${index}].end_time`,
                  e.target.value
                )
              }
              size="small"
              disabled={loading}
              inputProps={{
                step: 900, // 15 minute intervals
              }}
            />
          </Grid>

          {/* Capacity */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              fullWidth
              label="Capacity"
              name={`available_slots[${index}].capacity`}
              value={slot.capacity ?? 1}
              onChange={handleChange}
              size="small"
              inputProps={{ min: 1, max: 100 }}
              disabled={loading}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} md={6} sm={6}>
            <TextField
              type="number"
              fullWidth
              label="Price"
              name={`available_slots[${index}].price`}
              value={slot.price ?? ""}
              onChange={handleChange}
              size="small"
              inputProps={{ min: 0, step: 1 }}
              disabled={loading}
            />
          </Grid>

          {/* Active Toggle */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={slot.is_active ?? true}
                  onChange={(e) =>
                    setFieldValue(
                      `available_slots[${index}].is_active`,
                      e.target.checked
                    )
                  }
                  disabled={loading}
                  color="info"
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
