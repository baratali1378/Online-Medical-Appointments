"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Optionally verify payment with backend
      console.log("Payment session ID:", sessionId);
    }
  }, [sessionId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E3FDFD 0%, #FFE6FA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <CheckCircleIcon sx={{ fontSize: 90, color: "success.main" }} />
          </motion.div>

          <Typography
            variant="h4"
            fontWeight="bold"
            mt={3}
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Payment Successful!
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            Your appointment has been booked successfully 🎉 <br />
            You will receive a confirmation email shortly.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/dashboard/patient/appointments")}
          >
            Go to My Appointments
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}
