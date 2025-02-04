import React, { ReactNode } from 'react';
import { Container, Grid2 } from '@mui/material';

interface AuthLayoutProps {
    sideImage: ReactNode;
    formComponent: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
    sideImage,
    formComponent,
}) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
            <Grid2 container spacing={4}>
                {/* Side Image */}
                <Grid2 display={{ xs: "none", md: "flex" }} size={{ xs: 12, md: 6 }}>
                    {sideImage}
                </Grid2>

                {/* Login Form or other forms */}
                <Grid2 size={{ xs: 12, md: 6 }}>
                    {formComponent}
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default AuthLayout;
