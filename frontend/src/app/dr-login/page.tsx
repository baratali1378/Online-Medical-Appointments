
import React from 'react';
import SideImage from '../../components/common/AuthSideImage';
import LoginForm from '../../components/doctor-login/LoginForm';
import AuthLayout from '../../components/common/LoginLayout';

const LoginPage: React.FC = () => {
    return (
        <AuthLayout
            sideImage={<SideImage imageUrl="/docto_image (1).jpg" altText="Medical Appointment" />}
            formComponent={<LoginForm />}
        />
    );
};


export default LoginPage;
