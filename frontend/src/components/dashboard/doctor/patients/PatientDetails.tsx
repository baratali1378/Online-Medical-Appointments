"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
  useMediaQuery,
  Slide,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ApiPatient } from "@/types/patient";

interface PatientDetailsProps {
  patient: ApiPatient;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [tabIndex, setTabIndex] = useState(0);

  const {
    personal_info: { fullname, email, gender, birth, image },
    contact_details: { phone_number, postal_code, city },
    id: patientId,
  } = patient;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const goToMedicalRecords = () => {
    router.push(`/dashboard/patients/${patientId}/medical-records`);
  };

  const goToAppointments = () => {
    router.push(`/dashboard/patients/${patientId}/appointments`);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        maxWidth: 720,
        mx: "auto",
        my: 4,
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      {/* Tabs with soft pill style */}
      <Box sx={{ px: 2, pt: 2, bgcolor: "background.paper" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.primary.main,
              height: 4,
              borderRadius: 2,
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              borderRadius: 3,
              minHeight: 48,
            },
          }}
        >
          <Tab label="Patient Info" />
          <Tab label="Actions" />
        </Tabs>
      </Box>

      {/* Patient Info Tab */}
      <Slide direction="right" in={tabIndex === 0} mountOnEnter unmountOnExit>
        <CardContent
          sx={{
            minHeight: 350,
            p: isMobile ? 3 : 5,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={4}
            alignItems="center"
          >
            <Avatar
              src={API_URL + "" + image?.url}
              alt={fullname}
              sx={{
                width: 120,
                height: 120,
                fontSize: 40,
                bgcolor: "#71C9CE",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              }}
            />
            <Box flex={1}>
              <Typography variant="h4" fontWeight={700}>
                {fullname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gender: {gender || "—"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Date of Birth: {birth || "—"}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Phone Number
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {phone_number || "Not provided"}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Postal Code
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {postal_code || "Not provided"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  City
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {city?.name || "Not provided"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Slide>

      {/* Actions Tab */}
      <Slide direction="left" in={tabIndex === 1} mountOnEnter unmountOnExit>
        <CardContent
          sx={{
            minHeight: 300,
            p: isMobile ? 3 : 6,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
          }}
        >
          <Tooltip title="View or add medical records" arrow>
            <Button
              variant="contained"
              color="secondary"
              onClick={goToMedicalRecords}
              size="large"
              fullWidth={isMobile}
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: "0 6px 18px rgba(156,39,176,0.3)",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all 0.2s ease",
                },
              }}
            >
              Go to Medical Records
            </Button>
          </Tooltip>

          <Tooltip title="View or schedule appointments" arrow>
            <Button
              variant="outlined"
              color="primary"
              onClick={goToAppointments}
              size="large"
              fullWidth={isMobile}
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 3,
                  transform: "scale(1.05)",
                  backgroundColor: theme.palette.action.hover,
                  transition: "all 0.2s ease",
                },
              }}
            >
              Go to Appointments
            </Button>
          </Tooltip>
        </CardContent>
      </Slide>
    </Paper>
  );
};

export default PatientDetails;
