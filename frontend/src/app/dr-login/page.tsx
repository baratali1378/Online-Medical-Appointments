import React from 'react';
import { Container, Grid2 } from '@mui/material';
import SideImage from '../../components/login/SideImage';
import LoginForm from '../../components/login/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
            <Grid2 container spacing={4}>
                {/* Side Image */}
                <Grid2 display={{ xs: "none", md: "flex" }} size={{ xs: 12, md: 6 }}>
                    <SideImage
                        imageUrl="/docto_image (1).jpg"
                        altText="Medical Appointment"
                    />
                </Grid2>
                {/* Login Form */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <LoginForm />
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default LoginPage;