// hooks/useMedical.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MedicalRecordService } from "@/service/profile/doctor/medical";
import {
  CreateMedicalRecordPayload,
  DoctorMedicalResponse,
} from "@/types/medical-record";

export const useMedical = (token: string) => {
  const queryClient = useQueryClient();

  // Mutation for creating medical record
  const createMedicalRecord = useMutation<
    DoctorMedicalResponse,
    Error,
    {
      payload: Partial<CreateMedicalRecordPayload>;
      patientId: number;
      appointmentId: number;
    }
  >({
    mutationFn: ({ payload, patientId, appointmentId }) =>
      MedicalRecordService.doctor.create(
        token,
        payload,
        patientId,
        appointmentId
      ),
    onSuccess: (data) => {
      toast.success("Medical record created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create medical record");
    },
  });

  // Get all medical records for a patient (doctor's view)
  const useGetMedicalRecords = (patientId: number) => {
    const options: UseQueryOptions<
      DoctorMedicalResponse,
      Error,
      DoctorMedicalResponse,
      [string, number]
    > = {
      queryKey: ["doctorMedicalRecords", patientId],
      queryFn: () => MedicalRecordService.doctor.getAll(token, patientId),
      enabled: !!patientId,
      // ✅ Correct place for error handling
      retry: false,
    };

    const query = useQuery(options);

    if (query.error) {
      toast.error(query.error.message);
    }

    return query;
  };

  return {
    createMedicalRecord,
    useGetMedicalRecords,
  };
};
