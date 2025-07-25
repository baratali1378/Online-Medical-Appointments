"use client";

import { useParams } from "next/navigation";

export default function MedicalRecordClientView() {
  const params = useParams();
  const id = params.id;

  return <div>Viewing record for ID: {id}</div>;
}
