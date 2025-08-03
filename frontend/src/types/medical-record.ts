import { Appointment } from "./appointments";
import { PersonalInfo } from "./doctor";

export interface MedicalRecord {
  id: number;
  documentId: string;
  chief_complaint: string;
  symptoms: string;
  diagnoses: string;
  treatment_plan: string;
  prescription: string;
  notes: string;
  follow_up_required: boolean;
  follow_up_date: string | null;
  createdAt: string;
  updatedAt: string;

  patient: {
    personal_info: PersonalInfo;
  };

  doctor?: {
    id: number;
    personal_info: PersonalInfo;
  };

  appointment?: Appointment | null;
  files: {
    id: number;
    url: string;
    size: number;
  } | null;
}

// ===== Derived List View =====
export type MedicalRecordListItem = Pick<
  MedicalRecord,
  | "id"
  | "chief_complaint"
  | "diagnoses"
  | "follow_up_required"
  | "follow_up_date"
  | "createdAt"
> & {
  doctor?: {
    id: number;
    personal_info: Pick<PersonalInfo, "fullname">;
  };
  appointment?: Pick<Appointment, "id" | "date"> | null;
};

// ===== Generic Response Types =====
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export type PatientMedicalRecordListResponse =
  PaginatedResponse<MedicalRecordListItem>;

export interface PatientMedicalRecordDetailResponse {
  data: MedicalRecord;
}

export type CreateMedicalRecordPayload = Omit<
  MedicalRecord,
  | "id"
  | "documentId"
  | "createdAt"
  | "updatedAt"
  | "patient"
  | "doctor"
  | "appointment"
  | "files"
> & {
  files?: File[];
};

export interface DoctorMedicalResponse {
  message: string;
  data: MedicalRecord;
}
