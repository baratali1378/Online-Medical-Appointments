"use client";

import LoginPage from "@/components/common/LoginPage";
import React from "react";

const PatientLoginPage = () => {
  return (
    <LoginPage
      image_url={"/patient_login.jpg"}
      image_alt={"user Image"}
      user_role={"patient"}
    />
  );
};

export default PatientLoginPage;
