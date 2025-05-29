"use client";

import {
  Grid2,
  TextField,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface TimeOption {
  value: string;
  label: string;
  shortLabel: string;
}

interface TimeSlotFieldProps {
  index: number;
  slot: {
    days: string;
    start_time: string;
    end_time: string;
  };
  timeOptions: TimeOption[];
  daysOfWeek: { value: string; label: string }[];
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  remove: (index: number) => void;
  loading: boolean;
  isLastSlot: boolean;
}

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
    <Grid2
      container
      mt={1}
      spacing={2}
      alignItems="center"
      sx={{
        mb: 2,
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <TextField
          select
          fullWidth
          label={isMobile ? "Day" : "Select Day"}
          name={`available_slots[${index}].days`}
          value={slot.days}
          onChange={handleChange}
          size="small"
          disabled={loading}
        >
          {daysOfWeek.map((day) => (
            <MenuItem key={day.value} value={day.value}>
              {day.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>

      <Grid2 size={{ xs: 6, sm: 3 }}>
        <TextField
          select
          fullWidth
          label={isMobile ? "Start" : "Start Time"}
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
        >
          {timeOptions.map((time) => (
            <MenuItem key={time.value} value={time.value}>
              {isMobile ? time.shortLabel : time.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>

      <Grid2 size={{ xs: 6, sm: 3 }}>
        <TextField
          select
          fullWidth
          label={isMobile ? "End" : "End Time"}
          name={`available_slots[${index}].end_time`}
          value={slot.end_time}
          onChange={(e) =>
            setFieldValue(`available_slots[${index}].end_time`, e.target.value)
          }
          size="small"
          disabled={loading}
        >
          {timeOptions.map((time) => (
            <MenuItem key={time.value} value={time.value}>
              {isMobile ? time.shortLabel : time.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid2>

      <Grid2 size={{ xs: 12, sm: 3 }} display="flex" justifyContent="flex-end">
        <IconButton
          color="error"
          onClick={() => remove(index)}
          disabled={isLastSlot || loading}
        >
          <Delete />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};
