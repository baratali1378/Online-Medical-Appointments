// hooks/useMedical.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MedicalRecordService } from "@/service/profile/doctor/medical";
import { MedicalRecord, DoctorMedicalResponse } from "@/types/medical-record";

export const useMedical = (token: string) => {
  const queryClient = useQueryClient();

  // Get all medical records for the doctor
  const useGetMedicalRecords = () => {
    return useQuery<DoctorMedicalResponse, Error>({
      queryKey: ["doctorMedicalRecords"],
      queryFn: () => MedicalRecordService.doctor.getAll(token),
      onError: (error: Error) => {
        toast.error(error.message);
      },
      useErrorBoundary: false, // Add this if you want to handle errors locally
    } as any); // Temporary workaround - see better solution below
  };

  // Better solution: Create a custom query config type
  type QueryOptions<T> = {
    queryKey: unknown[];
    queryFn: () => Promise<T>;
    onError?: (error: Error) => void;
    enabled?: boolean;
  };

  // Get medical records for a specific patient
  const useGetPatientRecords = (patientId: number) => {
    const options: QueryOptions<DoctorMedicalResponse> = {
      queryKey: ["patientMedicalRecords", patientId],
      queryFn: () => MedicalRecordService.doctor.getByPatient(token, patientId),
      enabled: !!patientId,
      onError: (error: Error) => {
        toast.error(error.message);
      },
    };

    return useQuery<DoctorMedicalResponse, Error>(options);
  };

  // Create a new medical record
  const useCreateMedicalRecord = () => {
    return useMutation<MedicalRecord, Error, Partial<MedicalRecord>>({
      mutationFn: (payload) =>
        MedicalRecordService.doctor.create(token, payload),
      onSuccess: () => {
        toast.success("Medical record created successfully!");
        queryClient.invalidateQueries({ queryKey: ["doctorMedicalRecords"] });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  // Update an existing medical record
  const useUpdateMedicalRecord = (id: number) => {
    return useMutation<MedicalRecord, Error, Partial<MedicalRecord>>({
      mutationFn: (payload) =>
        MedicalRecordService.doctor.update(token, id, payload),
      onSuccess: () => {
        toast.success("Medical record updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["doctorMedicalRecords"] });
        queryClient.invalidateQueries({ queryKey: ["patientMedicalRecords"] });
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  return {
    useGetMedicalRecords,
    useGetPatientRecords,
    useCreateMedicalRecord,
    useUpdateMedicalRecord,
  };
};
