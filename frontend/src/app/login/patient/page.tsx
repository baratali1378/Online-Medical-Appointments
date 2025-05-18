"use client";

import LoginPage from "@/components/common/LoginPage";
import React from "react";

const PatientLoginPage = () => {
  return (
    <LoginPage
      image_url={"/patient_image.jpg"}
      image_alt={"user Image"}
      user_role={"user"}
    />
  );
};

export default PatientLoginPage;
