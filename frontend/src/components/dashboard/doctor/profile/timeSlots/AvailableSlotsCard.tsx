"use client";

import { Box, useTheme } from "@mui/material";
import { BaseCard } from "@/components/dashboard/common/Card";
import { TimeSlotForm } from "./TimeSlotForm";
import { generateTimeOptions } from "@/utils/generateTime";
import { daysOfWeek } from "@/components/constant/timeSlots";
import {
  useDoctorAvailableSlotsQuery,
  useDoctorAvailableSlotsMutation,
} from "@/hooks/profile/doctor/available-slots/useSlotsQuery";
import { AvailableSlot, AvailableSlotsCardProps } from "@/types/slots";

const timeOptions = generateTimeOptions();

export const AvailableSlotsCard = ({ token }: AvailableSlotsCardProps) => {
  const theme = useTheme();
  const { data, isLoading: queryLoading } = useDoctorAvailableSlotsQuery(token);
  const mutation = useDoctorAvailableSlotsMutation(token);

  const slots = data?.data ?? [];

  const handleSave = async (values: { available_slots: AvailableSlot[] }) => {
    try {
      for (const slot of values.available_slots) {
        if (slot.id === 0) {
          await mutation.mutateAsync({
            type: "create",
            data: {
              date: slot.date,
              start_time: slot.start_time,
              end_time: slot.end_time,
              capacity: slot.capacity,
              is_active: slot.is_active,
            },
          });
        } else if (slot.id) {
          await mutation.mutateAsync({
            type: "update",
            id: slot.id,
            data: {
              date: slot.date,
              start_time: slot.start_time,
              end_time: slot.end_time,
              capacity: slot.capacity,
              is_active: slot.is_active,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error saving slots:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await mutation.mutateAsync({ type: "delete", id });
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <Box
      sx={{
        mb: 4,
        borderRadius: 3,
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,
        p: { xs: 2, sm: 3 },
      }}
    >
      <BaseCard title="Manage Availability">
        <TimeSlotForm
          initialSlots={slots}
          onSubmit={handleSave}
          onDelete={handleDelete}
          isSubmitting={mutation.isPending}
          isLoading={queryLoading}
          timeOptions={timeOptions}
          daysOfWeek={daysOfWeek}
        />
      </BaseCard>
    </Box>
  );
};
