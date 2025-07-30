import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { DoctorAvailableSlotsService } from "../../../../service/profile/slots";
import { toast } from "react-toastify";
import {
  AvailableSlotResponse,
  AvailableSlot,
  SlotCreateInput,
  SlotUpdateInput,
} from "@/types/slots";

type MutationArgs =
  | { type: "create"; data: SlotCreateInput }
  | { type: "update"; id: number | string; data: SlotUpdateInput }
  | { type: "delete"; id: number | string };

export const useDoctorAvailableSlotsQuery = (token: string, enabled = true) => {
  return useQuery<AvailableSlotResponse, Error>({
    queryKey: ["doctorAvailableSlots"],
    queryFn: () => new DoctorAvailableSlotsService(token).getSlots(),
    enabled: !!token && enabled,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDoctorAvailableSlotsMutation = (token: string) => {
  const queryClient = useQueryClient();

  const toastMessages = {
    create: "Available slot created successfully!",
    update: "Available slot updated successfully!",
    delete: "Available slot deleted successfully!",
  };

  return useMutation<AvailableSlot | void, any, MutationArgs>({
    mutationFn: async (args) => {
      const service = new DoctorAvailableSlotsService(token);
      if (args.type === "create") return service.createSlot(args.data);
      if (args.type === "update") return service.updateSlot(args.id, args.data);
      if (args.type === "delete") return service.deleteSlot(args.id);
    },
    onSuccess: (_, variables) => {
      toast.success(toastMessages[variables.type]);
      queryClient.invalidateQueries({ queryKey: ["doctorAvailableSlots"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Operation failed on available slots");
    },
  });
};
