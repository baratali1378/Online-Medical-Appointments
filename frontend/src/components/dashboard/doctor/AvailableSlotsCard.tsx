"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import { Delete, Add } from "@mui/icons-material";
import { AvailableSlot, Doctor } from "@/types/doctor";
import { timeSlotsValidationSchema } from "@/utils/validation";
import { BrandButton } from "../common/BrandButton";

interface AvailableSlotsCardProps {
  slots: AvailableSlot[];
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  loading: boolean;
}

const daysOfWeek = [
  { value: "Monday", label: "Mon" },
  { value: "Tuesday", label: "Tue" },
  { value: "Wednesday", label: "Wed" },
  { value: "Thursday", label: "Thu" },
  { value: "Friday", label: "Fri" },
  { value: "Saturday", label: "Sat" },
  { value: "Sunday", label: "Sun" },
];

// Generate time options in 15-minute intervals
const generateTimeOptions = () => {
  return Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 || 12;
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00.000`,
      label: `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`,
      shortLabel: `${displayHour}${ampm}`,
    };
  });
};

const timeOptions = generateTimeOptions();

export const AvailableSlotsCard = ({
  slots,
  onUpdate,
  loading,
}: AvailableSlotsCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues = {
    available_slots:
      slots.length > 0
        ? slots.map((slot) => ({
            days: slot.days,
            start_time: slot.start_time,
            end_time: slot.end_time,
          }))
        : [
            {
              days: "Monday",
              start_time: "09:00:00.000",
              end_time: "17:00:00.000",
            },
          ],
  };

  // Find matching time option
  const findTimeOption = (time: string) => {
    return timeOptions.find((option) => option.value === time);
  };

  return (
    <BaseCard title="Available Time Slots">
      <Formik
        initialValues={initialValues}
        validationSchema={timeSlotsValidationSchema}
        onSubmit={async (values) => {
          await onUpdate({
            available_slots: values.available_slots,
          });
        }}
      >
        {({ values, isSubmitting, handleChange, setFieldValue }) => (
          <Form>
            <FieldArray name="available_slots">
              {({ push, remove }) => (
                <Box>
                  <Grid container spacing={isMobile ? 1 : 2}>
                    {values.available_slots.map((slot, index) => {
                      const startTimeOption = findTimeOption(slot.start_time);
                      const endTimeOption = findTimeOption(slot.end_time);

                      return (
                        <Grid item xs={12} key={index}>
                          <Grid
                            container
                            spacing={isMobile ? 1 : 2}
                            alignItems="center"
                          >
                            {/* Day Selector */}
                            <Grid item xs={3}>
                              <TextField
                                select
                                fullWidth
                                label={isMobile ? "" : "Day"}
                                name={`available_slots[${index}].days`}
                                value={slot.days}
                                onChange={handleChange}
                                size="small"
                                disabled={loading}
                                SelectProps={{
                                  MenuProps: {
                                    PaperProps: {
                                      style: {
                                        maxHeight: 300,
                                      },
                                    },
                                  },
                                }}
                              >
                                {daysOfWeek.map((day) => (
                                  <MenuItem
                                    key={day.value}
                                    value={day.value}
                                    sx={{
                                      padding: isMobile
                                        ? "6px 16px"
                                        : "8px 16px",
                                    }}
                                  >
                                    {isMobile ? day.label : day.value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>

                            {/* Start Time */}
                            <Grid item xs={3}>
                              <TextField
                                select
                                fullWidth
                                label={isMobile ? "" : "Start"}
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
                                  <MenuItem
                                    key={time.value}
                                    value={time.value}
                                    sx={{
                                      padding: isMobile
                                        ? "6px 16px"
                                        : "8px 16px",
                                    }}
                                  >
                                    {isMobile ? time.shortLabel : time.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>

                            {/* End Time */}
                            <Grid item xs={3}>
                              <TextField
                                select
                                fullWidth
                                label={isMobile ? "" : "End"}
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
                              >
                                {timeOptions.map((time) => (
                                  <MenuItem
                                    key={time.value}
                                    value={time.value}
                                    sx={{
                                      padding: isMobile
                                        ? "6px 16px"
                                        : "8px 16px",
                                    }}
                                  >
                                    {isMobile ? time.shortLabel : time.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>

                            {/* Delete Button */}
                            <Grid item xs={3}>
                              <IconButton
                                color="error"
                                onClick={() => remove(index)}
                                disabled={
                                  values.available_slots.length <= 1 || loading
                                }
                                size={isMobile ? "small" : "medium"}
                                sx={{
                                  marginLeft: isMobile ? "auto" : 0,
                                  display: "flex",
                                  marginRight: isMobile ? 0 : "auto",
                                }}
                              >
                                <Delete
                                  fontSize={isMobile ? "small" : "medium"}
                                />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* Add Time Slot Button with brand color */}
                  <Button
                    variant="outlined"
                    onClick={() =>
                      push({
                        days: "Monday",
                        start_time: "09:00:00.000",
                        end_time: "17:00:00.000",
                      })
                    }
                    sx={{
                      mt: 2,
                      width: isMobile ? "100%" : "auto",
                      color: "#71C9CE",
                      borderColor: "#71C9CE",
                      "&:hover": {
                        backgroundColor: "#E3F9FB",
                        borderColor: "#71C9CE",
                      },
                    }}
                    disabled={loading}
                    startIcon={<Add />}
                    size={isMobile ? "small" : "medium"}
                  >
                    Add Time Slot
                  </Button>
                </Box>
              )}
            </FieldArray>

            <Box mt={3} display="flex" justifyContent="flex-end">
              <BrandButton
                type="submit"
                loading={isSubmitting || loading}
                fullWidth={isMobile}
                size={isMobile ? "small" : "medium"}
              >
                Save Changes
              </BrandButton>
            </Box>
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
