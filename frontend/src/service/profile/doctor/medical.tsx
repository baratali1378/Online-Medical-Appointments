import { handleServiceError } from "@/lib/error";
import { createApiClient } from "@/lib/strapiClient";
import {
  CreateMedicalRecordPayload,
  DoctorMedicalResponse,
} from "@/types/medical-record";

export const MedicalRecordService = {
  doctor: {
    async create(
      token: string,
      payload: Partial<CreateMedicalRecordPayload> & { files?: File[] },
      patientId: number,
      appointmentId: number
    ): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);

        // If files are present in payload, send as FormData
        if (payload.files && payload.files.length > 0) {
          const formData = new FormData();

          for (const [key, value] of Object.entries(payload)) {
            if (key === "files") continue; // skip files here

            if (value !== undefined && value !== null) {
              if (typeof value === "object" && !(value instanceof File)) {
                formData.append(key, JSON.stringify(value));
              } else {
                formData.append(key, String(value));
              }
            }
          }

          payload.files.forEach((file) => {
            formData.append("files", file);
          });

          const response = await api.post<DoctorMedicalResponse>(
            `/api/doctor/medical-records?patientId=${patientId}&appointmentId=${appointmentId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          return response.data;
        }

        // No files: send JSON normally
        const response = await api.post<DoctorMedicalResponse>(
          `/api/doctor/medical-records?patientId=${patientId}&appointmentId=${appointmentId}`,
          payload
        );

        return response.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to create medical record");
      }
    },
    async getAll(
      token: string,
      patientId: number
    ): Promise<DoctorMedicalResponse> {
      try {
        const api = createApiClient(token);
        const response = await api.get<DoctorMedicalResponse>(
          `/api/doctor/medical-records`,
          {
            params: { patientId }, // Pass as query parameter
          }
        );

        return response.data;
      } catch (error) {
        throw handleServiceError(error, "Failed to fetch medical records");
      }
    },
  },
};
