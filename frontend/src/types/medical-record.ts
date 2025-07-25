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
  appointment: Appointment;
  files: FileAttachment[] | null;
}

export interface DoctorMedicalResponse {
  data: MedicalRecord[];
  meta: {
    total: number;
    coutn: number;
  };
}

export interface FileAttachment {
  id: number;
  name: string;
  url: string;
  size: number;
}
