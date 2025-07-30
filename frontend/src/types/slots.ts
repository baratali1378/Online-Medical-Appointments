// types/AvailableSlot.ts

export interface AvailableSlot {
  id: number;
  date: string; // ISO date string (e.g. "2025-07-23")
  start_time: string; // ISO time string (e.g. "00:15:00.000")
  end_time: string; // ISO time string (e.g. "00:30:00.000")
  capacity: number;
  is_active: boolean;
}

export interface AvailableSlotResponse {
  data: AvailableSlot[];
  meta: {
    count: number;
  };
}

export interface TimeOption {
  value: string;
  label: string;
  shortLabel: string;
}

export interface DayOption {
  value: string;
  label: string;
}

export interface AvailableSlotsCardProps {
  token: string;
}

export interface TimeSlotFieldProps {
  index: number;
  slot: AvailableSlot;
  timeOptions: TimeOption[];
  daysOfWeek?: DayOption[];
  handleChange: (e: React.ChangeEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  remove: (index: number) => void;
  loading: boolean;
  isLastSlot: boolean;
}

export interface TimeSlotFormProps {
  initialSlots: AvailableSlot[];
  onSubmit: (values: { available_slots: AvailableSlot[] }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isSubmitting: boolean;
  isLoading: boolean;
  timeOptions: any[];
  daysOfWeek: any[];
}
