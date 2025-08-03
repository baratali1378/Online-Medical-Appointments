"use client";
import { useParams } from "next/navigation";

export default function NewMedicalRecordPage() {
  const { patientId, appointmentId } = useParams();

  return (
    <div>
      Creating medical record for patient {patientId} and appointment{" "}
      {appointmentId}
    </div>
  );
}
