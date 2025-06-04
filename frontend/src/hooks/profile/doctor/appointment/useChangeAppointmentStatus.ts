// hooks/useChangeAppointmentStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeAppointmentStatus } from "@/service/profile/doctor/appointment";

interface ChangeStatusArgs {
  id: number | string;
  status: string;
}

export const useChangeAppointmentStatus = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, ChangeStatusArgs>({
    mutationFn: ({ id, status }) => changeAppointmentStatus(id, status, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
    },
    onError: (error) => {
      console.error("Error updating appointment status:", error);
    },
  });
};
