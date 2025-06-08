// hooks/useChangeAppointmentStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAppointmentStatus } from "@/service/profile/doctor/appointment";
import { toast } from "react-toastify";

interface ChangeStatusArgs {
  id: number | string;
  status: string;
}

export const useChangeAppointmentStatus = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, any, ChangeStatusArgs>({
    mutationFn: ({ id, status }) => changeAppointmentStatus(id, status, token),

    onSuccess: () => {
      toast.success("Appointment status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
