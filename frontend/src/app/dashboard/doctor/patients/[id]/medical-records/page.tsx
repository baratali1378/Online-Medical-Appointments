"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { patientId } = useParams();
  return <div>hello {patientId}</div>;
}
