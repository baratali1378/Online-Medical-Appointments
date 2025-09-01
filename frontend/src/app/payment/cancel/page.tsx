"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Button, Paper } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion } from "framer-motion";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFE6E6 0%, #FFF5F5 100%)",
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
            initial={{ rotate: 20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <CancelIcon sx={{ fontSize: 90, color: "error.main" }} />
          </motion.div>

          <Typography
            variant="h4"
            fontWeight="bold"
            mt={3}
            gutterBottom
            sx={{ color: "text.primary" }}
          >
            Payment Cancelled
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            Your appointment booking was not completed ❌ <br />
            You can try again or choose a different slot.
          </Typography>

          <Button
            variant="contained"
            size="large"
            color="error"
            sx={{
              mt: 2,
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={() => router.push("/dasboard/patient/appointments")}
          >
            Back to Appointments
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}
