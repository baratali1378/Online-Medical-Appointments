import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { DoctorAvailableSlotsService } from "@/service/profile/doctor/slots";
import { toast } from "react-toastify";
import { AvailableSlotResponse, AvailableSlot } from "@/types/slots";

interface SlotCreateInput {
  date: string;
  start_time: string;
  end_time: string;
  capacity?: number;
  is_active?: boolean;
}

interface SlotUpdateInput {
  date?: string;
  start_time?: string;
  end_time?: string;
  capacity?: number;
  is_active?: boolean;
}

type MutationArgs =
  | { type: "create"; data: SlotCreateInput }
  | { type: "update"; id: number | string; data: SlotUpdateInput }
  | { type: "delete"; id: number | string };

export const useDoctorAvailableSlotsQuery = (token: string, enabled = true) => {
  return useQuery<AvailableSlotResponse, Error>({
    queryKey: ["doctorAvailableSlots"],
    queryFn: () => {
      const service = new DoctorAvailableSlotsService(token);
      return service.getSlots();
    },
    enabled: !!token && enabled,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDoctorAvailableSlotsMutation = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<AvailableSlot | void, any, MutationArgs>({
    mutationFn: async (args) => {
      const service = new DoctorAvailableSlotsService(token);
      switch (args.type) {
        case "create":
          return await service.createSlot(args.data);
        case "update":
          return await service.updateSlot(args.id, args.data);
        case "delete":
          await service.deleteSlot(args.id);
          return;
      }
    },
    onSuccess: (data, variables) => {
      switch (variables.type) {
        case "create":
          toast.success("Available slot created successfully!");
          break;
        case "update":
          toast.success("Available slot updated successfully!");
          break;
        case "delete":
          toast.success("Available slot deleted successfully!");
          break;
      }
      queryClient.invalidateQueries({ queryKey: ["doctorAvailableSlots"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Operation failed on available slots");
    },
  });
};
