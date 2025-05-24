import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/service/doctorService";
import { DoctorSignupFormValues } from "@/types/doctor";

export const useDoctorSignup = () => {
  return useMutation({
    mutationFn: (data: DoctorSignupFormValues) => signUp(data),
  });
};
