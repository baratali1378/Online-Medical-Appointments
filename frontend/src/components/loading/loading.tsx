"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

const AnimatedLoading = () => {

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                background: "#ffff", // Blue gradient
            }}
        >
            {/* Animated Dots */}
            <Box display="flex" gap={1}>
                {[0, 1, 2].map((index) => (
                    <Box
                        key={index}
                        bgcolor={"#71C9CE"}
                        sx={{
                            width: 15,
                            height: 15,
                            borderRadius: "50%",
                            animation: `bounce 1.5s infinite`,
                            animationDelay: `${index * 0.2}s`,
                        }}
                    />
                ))}
            </Box>

            {/* Glowing "Loading..." Text */}
            <Typography
                variant="h5"
                sx={{
                    mt: 2,
                    color: "#A6E3E9",
                    fontWeight: 600,
                    textShadow: "0px 0px 5px #CBF1F5", // Glowing text effect
                    animation: "fadeIn 2s ease-in-out infinite alternate",
                }}
            >
                Loading...
            </Typography>
        </Box>
    );
};

export default AnimatedLoading;
