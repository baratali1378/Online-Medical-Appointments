"use client";

import LoginPage from "@/components/common/LoginPage";
import ProtectedAuth from "@/components/common/ProtectedAuth";
import React from "react";

const PatientLoginPage = () => {
  return (
    <ProtectedAuth>
      <LoginPage
        image_url={"/patient_login.jpg"}
        image_alt={"user Image"}
        user_role={"patient"}
      />
    </ProtectedAuth>
  );
};

export default PatientLoginPage;
