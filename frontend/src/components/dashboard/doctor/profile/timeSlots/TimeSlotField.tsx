"use client";

import {
  Grid,
  TextField,
  MenuItem,
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
            />
          </Grid>

          {/* Start Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              fullWidth
              label="Start Time"
              name={`available_slots[${index}].start_time`}
              value={slot.start_time}
              onChange={(e) =>
                setFieldValue(
                  `available_slots[${index}].start_time`,
                  e.target.value
                )
              }
              size="small"
              disabled={loading}
            />
          </Grid>

          {/* End Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="time"
              fullWidth
              label="End Time"
              name={`available_slots[${index}].end_time`}
              value={slot.end_time}
              onChange={(e) =>
                setFieldValue(
                  `available_slots[${index}].end_time`,
                  e.target.value
                )
              }
              size="small"
              disabled={loading}
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
              inputProps={{ min: 1 }}
              disabled={loading}
            />
          </Grid>

          {/* Active Toggle */}
          <Grid item xs={12}>
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
