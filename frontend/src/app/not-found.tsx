"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
    const router = useRouter();

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                px: { xs: 3, sm: 5, md: 10 }, // Adjust padding for better spacing
            }}
        >
            {/* Animated Background Circles */}
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    width: "20vw",
                    height: "20vw",
                    backgroundColor: "#CBF1F5",
                    borderRadius: "50%",
                    top: "15%",
                    left: "8%",
                    zIndex: -1,
                }}
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    width: "15vw",
                    height: "15vw",
                    backgroundColor: "#E3FDFD",
                    borderRadius: "50%",
                    bottom: "10%",
                    right: "5%",
                    zIndex: -1,
                }}
            />

            {/* Glassmorphism Effect Box */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderRadius: 4,
                    padding: { xs: 3, sm: 4, md: 6 }, // Responsive padding
                    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: { xs: "320px", sm: "450px", md: "500px" }, // Adjust width for different screens
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
                        fontWeight: "bold",
                        color: "#71C9CE",
                    }}
                >
                    404
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        mb: { xs: 2, sm: 3 },
                        fontSize: { xs: "1rem", sm: "1.2rem" },
                        color: "#A6E3E9",
                    }}
                >
                    Oops! The page you are looking for does not exist.
                </Typography>

                {/* Button to Go Home */}
                <Button
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained"
                    color="secondary"
                    onClick={() => router.push("/")}
                    sx={{
                        mt: 2,
                        px: { xs: 3, sm: 5 },
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        borderRadius: "8px",
                        bgcolor: "#71C9CE"
                    }}
                >
                    Go Back Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
