// types/medical-record.ts
import { Appointment } from "./appointments";
import { PersonalInfo } from "./doctor";

// ===== Core Medical Record Entity =====
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
    id?: number;
    personal_info: PersonalInfo;
  };

  doctor?: {
    id: number;
    personal_info: PersonalInfo;
  };

  appointment?: Appointment | null;

  files: file[];
}

export interface file {
  id: number;
  url: string;
  size: number;
}

// ===== Derived List View (for tables) =====
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

export interface CountResponse<T> {
  data: T[];
  meta: {
    total: number;
    count: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  meta?: any;
}

// ===== Specific API Response Aliases =====
export type DoctorMedicalResponse = CountResponse<MedicalRecord>;
export type PatientMedicalRecordListResponse =
  PaginatedResponse<MedicalRecordListItem>;
export type PatientMedicalRecordDetailResponse = ApiResponse<MedicalRecord>;

// ===== Payload for Creating a Medical Record =====
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
