"use client"
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useLoginForm from '../../hooks/login/useLoginForm';

const LoginForm: React.FC = () => {
    const { initialValues, validationSchema, handleSubmit } = useLoginForm();
    const [result, setResult] = useState<{ success: boolean; message?: string } | null>(
        null
    );

    const onSubmit = async (values: { email: string; password: string }) => {
        const result = await handleSubmit(values);
        setResult(result);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                padding: { xs: 2, md: 0 },
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
                Welcome back! Please log in to your account.
            </Typography>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field
                            as={TextField}
                            fullWidth
                            label="Email"
                            name="email"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <ErrorMessage name="email" component="div" />

                        <Field
                            as={TextField}
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <ErrorMessage name="password" component="div" />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>

            {/* Display success or error message */}
            <Snackbar
                open={!!result}
                autoHideDuration={6000}
                onClose={() => setResult(null)}
            >
                <Alert
                    severity={result?.success ? 'success' : 'error'}
                    onClose={() => setResult(null)}
                >
                    {result?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginForm;