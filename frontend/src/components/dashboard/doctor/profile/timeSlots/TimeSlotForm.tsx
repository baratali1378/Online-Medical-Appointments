"use client";

import { Formik, Form, FieldArray } from "formik";
import {
  Box,
  Fab,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { TimeSlotField } from "./TimeSlotField";
import { TimeSlotFormProps } from "@/types/slots";
import { timeSlotsValidationSchema } from "@/utils/validation";
import { EmptyState } from "./EmptyState";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { v4 as uuidv4 } from "uuid";

// Helper function to format time for backend
const formatTimeForBackend = (timeString: string) => {
  if (!timeString) return "00:00:00.000";
  if (timeString.includes(".")) return timeString; // Already formatted
  return `${timeString}:00.000`; // Convert HH:mm to HH:mm:00.000
};

export const TimeSlotForm = ({
  initialSlots,
  onSubmit,
  onDelete,
  isSubmitting,
  isLoading,
  timeOptions,
  daysOfWeek,
}: TimeSlotFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues = {
    available_slots: initialSlots.map((slot) => ({
      ...slot,
      tempId: slot.id || uuidv4(),
    })),
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={timeSlotsValidationSchema}
      onSubmit={async (values) => {
        const sanitizedValues = {
          available_slots: values.available_slots.map(
            ({ tempId, ...slot }) => ({
              ...slot,
              start_time: formatTimeForBackend(slot.start_time),
              end_time: formatTimeForBackend(slot.end_time),
              price: slot.price ?? 0, // ✅ ensure price is set
            })
          ),
        };
        await onSubmit(sanitizedValues);
      }}
    >
      {({ values, handleChange, setFieldValue, dirty }) => (
        <Form>
          <FieldArray name="available_slots">
            {({ push, remove }) => (
              <Box sx={{ position: "relative", pb: isMobile ? 8 : 0 }}>
                {values.available_slots.length === 0 ? (
                  <EmptyState />
                ) : (
                  values.available_slots.map((slot, index) => (
                    <TimeSlotField
                      key={slot.tempId}
                      index={index}
                      slot={slot}
                      timeOptions={timeOptions}
                      daysOfWeek={daysOfWeek}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      remove={(i) => {
                        if (slot.id) onDelete(slot.id);
                        remove(i);
                      }}
                      loading={isLoading || isSubmitting}
                      isLastSlot={values.available_slots.length <= 1}
                    />
                  ))
                )}

                {/* Add Slot */}
                {isMobile ? (
                  <Box display={"flex"} justifyContent={"flex-start"}>
                    <Fab
                      color="info"
                      onClick={() =>
                        push({
                          id: 0,
                          tempId: uuidv4(),
                          date: new Date().toISOString().split("T")[0],
                          start_time: "09:00",
                          end_time: "17:00",
                          capacity: 1,
                          price: 0, // ✅ default price
                          is_active: true,
                        })
                      }
                      disabled={isLoading || isSubmitting}
                    >
                      <Add />
                    </Fab>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() =>
                        push({
                          id: 0,
                          tempId: uuidv4(),
                          date: new Date().toISOString().split("T")[0],
                          start_time: "09:00",
                          end_time: "17:00",
                          capacity: 1,
                          price: 0, // ✅ default price
                          is_active: true,
                        })
                      }
                      disabled={isLoading || isSubmitting}
                      startIcon={<Add />}
                    >
                      Add Time Slot
                    </Button>
                  </Box>
                )}

                {/* Save Button */}
                {values.available_slots.length > 0 && (
                  <>
                    {!isMobile && <Divider sx={{ my: 3 }} />}
                    <Box
                      sx={{
                        marginTop: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <BrandButton
                        type="submit"
                        loading={isSubmitting}
                        disabled={!dirty || isSubmitting}
                      >
                        Save Changes
                      </BrandButton>
                    </Box>
                  </>
                )}
              </Box>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};
