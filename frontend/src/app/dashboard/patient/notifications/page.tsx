"use client";

// pages/PatientNotificationPage.tsx
import React from "react";
import { NotificationPage } from "@/components/dashboard/notification/NotificationPage";
import { withAuth } from "@/components/dashboard/withAuth";

type Props = {
  session: any;
};

const DoctorNotificationsPage: React.FC<Props> = ({ session }) => {
  const token = session?.user?.token || "";

  return <NotificationPage token={token} userType="patient" />;
};

export default withAuth(DoctorNotificationsPage, "patient");
