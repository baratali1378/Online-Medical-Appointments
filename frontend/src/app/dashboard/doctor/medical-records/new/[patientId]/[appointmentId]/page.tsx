"use client";

import { useParams, useRouter } from "next/navigation";
import { withAuth } from "@/components/dashboard/withAuth";
import { MedicalRecordForm } from "@/components/dashboard/doctor/medical/MedicalRecordForm";
import { useMedical } from "@/hooks/profile/doctor/useMedical";

function NewMedicalRecordPage({ session }: { session: any }) {
  const { patientId, appointmentId } = useParams();
  const router = useRouter();
  const token = session?.user?.token || "";
  const { createMedicalRecord } = useMedical(token);

  const initialValues = {
    chief_complaint: "",
    symptoms: "",
    diagnoses: "",
    treatment_plan: "",
    prescription: "",
    notes: "",
    follow_up_required: false,
    follow_up_date: null,
    files: [],
  };

  return (
    <MedicalRecordForm
      title="🩺 Create Medical Record"
      submitLabel="Create Record"
      initialValues={initialValues}
      isSubmitting={false}
      isPending={createMedicalRecord.isPending}
      onSubmit={(values: any, files) => {
        const payload = {
          ...values,
          follow_up_date: values.follow_up_date
            ? values.follow_up_date.toISOString()
            : null,
          files,
        };
        createMedicalRecord.mutate(
          {
            payload,
            patientId: Number(patientId),
            appointmentId: Number(appointmentId),
          },
          {
            onSuccess: () =>
              router.push(
                `/dashboard/doctor/patients/${patientId}/medical-records`
              ),
          }
        );
      }}
    />
  );
}

export default withAuth(NewMedicalRecordPage, "doctor");
