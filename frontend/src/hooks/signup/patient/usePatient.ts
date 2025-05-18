import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/service/patientService";
import { PatientSignupResponse, SignupFormValues } from "@/types/patient";

export const usePatient = () => {
  const mutation = useMutation<PatientSignupResponse, Error, SignupFormValues>({
    mutationFn: (data) => signUp(data),
  });

  return {
    signup: mutation.mutateAsync,
    loading: mutation.isPending, // should exist here
    error: mutation.isError ? mutation.error : null,
  };
};
