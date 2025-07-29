import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePatientAppointmentStatus } from "@/service/profile/patient/appointmentService";
import { toast } from "react-toastify";

interface ChangeStatusArgs {
  id: number | string;
  status: string;
}

export const useChangePatientAppointmentStatus = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, any, ChangeStatusArgs>({
    mutationFn: ({ id, status }) =>
      changePatientAppointmentStatus(id, status, token),

    onSuccess: () => {
      toast.success("Appointment status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
