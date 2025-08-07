"use client";

import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useMedical } from "@/hooks/profile/doctor/useMedical";
import { withAuth } from "@/components/dashboard/withAuth";
import { MedicalRecordForm } from "@/components/dashboard/doctor/medical/MedicalRecordForm";
import { Box, CircularProgress, Typography } from "@mui/material";

function EditMedicalRecordPage({ session }: { session: any }) {
  const { id, patientId } = useParams();
  const router = useRouter();
  const token = session?.user?.token || "";
  const { useGetMedicalRecordById, updateMedicalRecord } = useMedical(token);

  const {
    data: medicalRecord,
    isLoading,
    error,
  } = useGetMedicalRecordById(Number(id));

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Typography color="error">Failed to load record.</Typography>;
  if (!medicalRecord) return <Typography>No record found.</Typography>;

  const initialValues = {
    chief_complaint: medicalRecord.chief_complaint || "",
    symptoms: medicalRecord.symptoms || "",
    diagnoses: medicalRecord.diagnoses || "",
    treatment_plan: medicalRecord.treatment_plan || "",
    prescription: medicalRecord.prescription || "",
    notes: medicalRecord.notes || "",
    follow_up_required: medicalRecord.follow_up_required || false,
    follow_up_date: medicalRecord.follow_up_date
      ? dayjs(medicalRecord.follow_up_date)
      : null,
    files: [],
  };

  return (
    <MedicalRecordForm
      title="✏️ Edit Medical Record"
      submitLabel="Update Record"
      initialValues={initialValues}
      existingFiles={medicalRecord.files}
      isSubmitting={false}
      isPending={updateMedicalRecord.isPending}
      onSubmit={(values, files) => {
        const payload = {
          ...values,
          follow_up_date: values.follow_up_date
            ? values.follow_up_date.toISOString()
            : null,
          files,
        };
        updateMedicalRecord.mutate(
          { id: Number(id), payload },
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

export default withAuth(EditMedicalRecordPage, "doctor");
