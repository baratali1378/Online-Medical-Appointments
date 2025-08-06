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
  MedicalRecord,
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

  // Mutation for updating medical record
  const updateMedicalRecord = useMutation<
    DoctorMedicalResponse,
    Error,
    {
      id: number;
      payload: Partial<CreateMedicalRecordPayload>;
    }
  >({
    mutationFn: ({ id, payload }) =>
      MedicalRecordService.doctor.update(token, id, payload),
    onSuccess: (data) => {
      toast.success("Medical record updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update medical record");
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
      retry: false,
    };

    const query = useQuery(options);

    if (query.error) {
      toast.error(query.error.message);
    }

    return query;
  };

  // Get a single medical record by ID
  const useGetMedicalRecordById = (id: number) => {
    const options: UseQueryOptions<MedicalRecord, Error> = {
      queryKey: ["doctorMedicalRecord", id],
      queryFn: () => MedicalRecordService.doctor.getById(token, id),
      enabled: !!id,
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
    updateMedicalRecord,
    useGetMedicalRecords,
    useGetMedicalRecordById,
  };
};
