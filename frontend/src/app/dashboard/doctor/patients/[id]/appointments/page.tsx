"use client";

import React from "react";
import { withAuth } from "@/components/dashboard/withAuth";
import { useParams } from "next/navigation";

interface Prop {
  session: any;
}

const AppointmentsPage = ({ session }: Prop) => {
  const { id } = useParams();
  const token = session?.user?.token || "";

  return <div>hello {id}</div>;
};

export default withAuth(AppointmentsPage, "doctor");
