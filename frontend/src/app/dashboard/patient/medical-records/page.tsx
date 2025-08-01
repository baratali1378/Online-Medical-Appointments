"use client";

import React from "react";
import { withAuth } from "@/components/dashboard/withAuth";
import MedicalRecordsContainer from "@/components/dashboard/patient/medical-records/MedicalRecordsContainer";

type Props = {
  session: any;
};

function PatientMedicalRecordsPage({ session }: Props) {
  const token = session?.user?.token || "";

  return <MedicalRecordsContainer token={token} />;
}

export default withAuth(PatientMedicalRecordsPage, "patient");
