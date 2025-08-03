"use client";
import { useParams } from "next/navigation";

export default function NewMedicalRecordPage() {
  const { id } = useParams();

  return <div>Creating medical record for patient {id} and appointment </div>;
}
