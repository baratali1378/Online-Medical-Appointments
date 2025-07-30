// types/AvailableSlot.ts

export interface AvailableSlot {
  id: number;
  date: string; // ISO date
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  capacity: number;
  is_active: boolean;
}

export interface AvailableSlotResponse {
  data: AvailableSlot[];
  meta: {
    count: number;
  };
}

// For creating a slot (id excluded, some fields optional)
export type SlotCreateInput = Omit<AvailableSlot, "id">;

// For updating a slot (all optional)
export type SlotUpdateInput = Partial<Omit<AvailableSlot, "id">>;

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
