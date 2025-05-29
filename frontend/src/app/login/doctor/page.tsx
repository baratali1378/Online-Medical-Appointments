import React from "react";
import LoginPage from "@/components/common/LoginPage";
import ProtectedAuth from "@/components/common/ProtectedAuth";

const DoctorLoginPage: React.FC = () => {
  return (
    <ProtectedAuth>
      <LoginPage
        image_url="/doctor_image.jpg"
        image_alt="Doctor Login"
        user_role="doctor"
      />
    </ProtectedAuth>
  );
};

export default DoctorLoginPage;
