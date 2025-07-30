import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { AvailableSlot } from "@/types/slots";

export const useAppointmentReschedule = (
  initialDate: string,
  availableSlots?: AvailableSlot[]
) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slotsByDay, setSlotsByDay] = useState<Record<string, any>>({});
  const [filteredSlots, setFilteredSlots] = useState<AvailableSlot[]>([]);

  useEffect(() => {
    if (availableSlots) {
      // Group slots by day
      const grouped = availableSlots.reduce((acc, slot) => {
        const day = format(parseISO(slot.date), "EEEE");
        const dateStr = format(parseISO(slot.date), "MMM d");
        const key = `${day}-${dateStr}`;

        if (!acc[key]) {
          acc[key] = {
            day,
            date: slot.date,
            dateStr,
            slots: [],
          };
        }
        acc[key].slots.push(slot);
        return acc;
      }, {} as Record<string, any>);

      setSlotsByDay(grouped);
    }
  }, [availableSlots]);

  useEffect(() => {
    if (availableSlots) {
      // Filter slots for selected date
      const filtered = availableSlots.filter(
        (slot) =>
          slot.date === selectedDate &&
          slot.is_active &&
          new Date(`${slot.date}T${slot.end_time}`) > new Date()
      );
      setFilteredSlots(filtered);
      setSelectedSlot(null); // Reset selection when date changes
    }
  }, [selectedDate, availableSlots]);

  return {
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    slotsByDay,
    filteredSlots,
  };
};
