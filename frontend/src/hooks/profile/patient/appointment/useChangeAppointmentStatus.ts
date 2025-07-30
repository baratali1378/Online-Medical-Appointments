import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePatientAppointmentStatus } from "@/service/profile/patient/appointmentService";
import { toast } from "react-toastify";

interface ChangeStatusArgs {
  id: number | string;
  status: string;
  date?: string;
  available_slot?: number | string;
}

export const useChangePatientAppointmentStatus = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, any, ChangeStatusArgs>({
    mutationFn: ({ id, status, date, available_slot }) =>
      changePatientAppointmentStatus(id, status, token, date, available_slot),

    onSuccess: () => {
      toast.success("Appointment updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["patientAppointments"] });
      queryClient.invalidateQueries({ queryKey: ["doctorAppointments"] });
    },

    onError: (error) => {
      toast.error(error.message || "Failed to update appointment");
    },
  });
};
