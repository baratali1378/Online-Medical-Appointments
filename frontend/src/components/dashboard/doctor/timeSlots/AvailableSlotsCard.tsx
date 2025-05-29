"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import { Add } from "@mui/icons-material";
import { AvailableSlot, Doctor } from "@/types/doctor";
import { timeSlotsValidationSchema } from "@/utils/validation";
import { BrandButton } from "../../common/BrandButton";
import { useRef } from "react";
import { TimeSlotField } from "./TimeSlotField";
import { generateTimeOptions } from "@/utils/generateTime";
import { daysOfWeek } from "@/components/constant/timeSlots";

interface AvailableSlotsCardProps {
  slots: AvailableSlot[];
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  loading: boolean;
}

const timeOptions = generateTimeOptions();

export const AvailableSlotsCard = ({
  slots,
  onUpdate,
  loading,
}: AvailableSlotsCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const slotRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    available_slots: slots.length
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

  return (
    <Box
      sx={{
        mb: 4,
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <BaseCard title="Available Time Slots">
        <Formik
          initialValues={initialValues}
          validationSchema={timeSlotsValidationSchema}
          onSubmit={async (values, actions) => {
            await onUpdate({ available_slots: values.available_slots });
            actions.setSubmitting(false);
          }}
        >
          {({ values, isSubmitting, handleChange, setFieldValue, dirty }) => (
            <Form>
              <FieldArray name="available_slots">
                {({ push, remove }) => (
                  <Box>
                    {values.available_slots.map((slot, index) => (
                      <TimeSlotField
                        key={index}
                        index={index}
                        slot={slot}
                        timeOptions={timeOptions}
                        daysOfWeek={daysOfWeek}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        remove={remove}
                        loading={loading}
                        isLastSlot={values.available_slots.length <= 1}
                      />
                    ))}

                    {/* Add Time Slot Button */}
                    <Box
                      display="flex"
                      justifyContent={isMobile ? "center" : "flex-start"}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          push({
                            days: "Monday",
                            start_time: "09:00:00.000",
                            end_time: "17:00:00.000",
                          });
                          setTimeout(() => {
                            slotRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 100);
                        }}
                        sx={{
                          mt: 1,
                          mb: 2,
                          borderColor: "#71C9CE",
                          color: "#71C9CE",
                          "&:hover": {
                            backgroundColor: "#E3F9FB",
                            borderColor: "#71C9CE",
                          },
                        }}
                        startIcon={<Add />}
                        disabled={loading}
                        size={isMobile ? "small" : "medium"}
                      >
                        Add Time Slot
                      </Button>
                    </Box>
                  </Box>
                )}
              </FieldArray>

              {/* Submit Button */}
              <Box mt={2} display="flex" justifyContent="flex-end">
                <BrandButton
                  type="submit"
                  loading={isSubmitting || loading}
                  fullWidth={isMobile}
                  size={isMobile ? "small" : "medium"}
                  disabled={!dirty || loading}
                >
                  Save Changes
                </BrandButton>
              </Box>
            </Form>
          )}
        </Formik>
      </BaseCard>
    </Box>
  );
};
