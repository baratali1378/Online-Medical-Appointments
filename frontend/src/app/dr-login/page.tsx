import React from "react";
import LoginPage from "@/components/common/LoginPage";

const DoctorLoginPage: React.FC = () => {
    return (
        <LoginPage image_url="/doctor_image.jpg" image_alt="Doctor Login" user_role="doctor" />
    );
};

export default DoctorLoginPage;
