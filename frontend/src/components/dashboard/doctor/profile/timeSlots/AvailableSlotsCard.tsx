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

  const handleSave = async (
    values: { available_slots: AvailableSlot[] },
    originalSlots: AvailableSlot[]
  ) => {
    try {
      for (const slot of values.available_slots) {
        const original = originalSlots.find((s) => s.id === slot.id);

        // Create new slot
        if (slot.id === 0) {
          await mutation.mutateAsync({ type: "create", data: slot });
        }
        // Update changed slots
        else if (
          original &&
          JSON.stringify(original) !== JSON.stringify(slot)
        ) {
          await mutation.mutateAsync({
            type: "update",
            id: slot.id,
            data: slot,
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
          onSubmit={(values) => handleSave(values, slots)} // ✅ pass slots for comparison
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
