import { useQuery } from "@tanstack/react-query";
import {
  PatientMedicalRecordDetailResponse,
  PatientMedicalRecordListResponse,
} from "@/types/medical-record";
import {
  getPatientMedicalRecordById,
  getPatientMedicalRecords,
} from "@/service/profile/patient/medical-record";

interface UsePatientMedicalRecordsQueryOptions {
  token: string;
  page?: number;
  pageSize?: number;
  search?: string;
  enabled?: boolean;
}

export const usePatientMedicalRecordsQuery = ({
  token,
  page = 1,
  pageSize = 10,
  search = "",
  enabled = true,
}: UsePatientMedicalRecordsQueryOptions) => {
  return useQuery<PatientMedicalRecordListResponse, Error>({
    queryKey: ["patientMedicalRecords", page, pageSize, search],
    queryFn: () => getPatientMedicalRecords(token, { page, pageSize, search }),
    enabled: !!token && enabled,
    //  keepPreviousData: true, // 🔹 Prevents UI flicker when switching pages
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

// ===== Hook for Detail View =====
interface UsePatientMedicalRecordDetailQueryOptions {
  token: string;
  recordId: string;
  enabled?: boolean;
}

export const usePatientMedicalRecordDetailQuery = ({
  token,
  recordId,
  enabled = true,
}: UsePatientMedicalRecordDetailQueryOptions) => {
  return useQuery<PatientMedicalRecordDetailResponse, Error>({
    queryKey: ["patientMedicalRecordDetail", recordId],
    queryFn: () => getPatientMedicalRecordById(recordId, token),
    enabled: !!token && !!recordId && enabled,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
