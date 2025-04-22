import React from "react";
import LoginPage from "@/components/common/LoginPage";

const UserLoginPage: React.FC = () => {
    return (
        <LoginPage image_url="/patient_image.jpg" image_alt="Patient Login" user_role="user" />
    );
};

export default UserLoginPage;
