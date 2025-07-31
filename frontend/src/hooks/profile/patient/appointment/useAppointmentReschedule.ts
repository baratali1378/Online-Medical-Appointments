import { useState, useEffect } from "react";
import { AvailableSlot } from "@/types/slots";

export const useAppointmentReschedule = (
  initialDate: string,
  availableSlots?: AvailableSlot[]
) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [filteredSlots, setFilteredSlots] = useState<AvailableSlot[]>([]);

  useEffect(() => {
    if (!availableSlots) return;
    const filtered = availableSlots.filter(
      (slot) =>
        slot.date === selectedDate &&
        slot.is_active &&
        new Date(`${slot.date}T${slot.end_time}`) > new Date()
    );
    setFilteredSlots(filtered);
    setSelectedSlot(0);
  }, [selectedDate, availableSlots]);

  return {
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    filteredSlots,
  };
};
