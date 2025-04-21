"use client";

import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Fade,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContactForm } from "@/hooks/useContactForm";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const ContactForm = () => {
  const { submitContactForm, loading, success } = useContactForm();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string(),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitContactForm(values);
        resetForm();
      } catch (err) {
        throw err;
      }
    },
  });

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 6,
        p: 4,
        borderRadius: 4,
        backgroundColor: "#f9f9f9",
      }}
      className={poppins.className}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: "#71C9CE",
          mb: 4,
        }}
      >
        Send Us a Message
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fullname"
              name="fullname"
              label="Full Name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone (Optional)"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={4}
              id="message"
              name="message"
              label="Message"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className={poppins.className}
                sx={{
                  px: 5,
                  py: 1.5,
                  bgcolor: "#71C9CE",
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Send Message"}
              </Button>

              <Fade in={success}>
                <Typography
                  color="success.main"
                  fontWeight={500}
                  mt={2}
                  fontSize="1rem"
                >
                  🎉 Message sent successfully!
                </Typography>
              </Fade>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
