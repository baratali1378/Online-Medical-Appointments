"use client";

import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useMedical } from "@/hooks/profile/doctor/useMedical";
import { withAuth } from "@/components/dashboard/withAuth";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

function MedicalRecordPage({ session }: { session: any }) {
  const { id, patientId } = useParams();
  const router = useRouter();
  const token = session?.user?.token || "";
  const { useGetMedicalRecordById } = useMedical(token);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: medicalRecord,
    isLoading,
    error,
  } = useGetMedicalRecordById(Number(id));

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Typography color="error">Failed to load record.</Typography>;

  if (!medicalRecord)
    return (
      <Alert variant="outlined" color="error">
        No record found.
      </Alert>
    );

  return (
    <Box maxWidth="md" mx="auto" p={isMobile ? 2 : 3}>
      {/* Top Buttons */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        spacing={2}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() =>
            router.push(
              `/dashboard/doctor/medical-records/${id}/${patientId}/edit`
            )
          }
          sx={{
            bgcolor: "#71C9CE",
            "&:hover": { bgcolor: "#5bb4b8" },
          }}
        >
          Edit
        </Button>
      </Stack>

      {/* Page Title */}
      <Typography
        variant={isMobile ? "h5" : "h4"}
        fontWeight="bold"
        color="#71C9CE"
        textAlign="center"
        mb={4}
      >
        Medical Record Details
      </Typography>

      {/* Medical Record Details */}
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          p: isMobile ? 2 : 3,
          bgcolor: "#f9fafa",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Grid container spacing={3}>
            {[
              {
                label: "Chief Complaint",
                value: medicalRecord.chief_complaint,
              },
              { label: "Symptoms", value: medicalRecord.symptoms },
              { label: "Diagnoses", value: medicalRecord.diagnoses },
              { label: "Treatment Plan", value: medicalRecord.treatment_plan },
              { label: "Prescription", value: medicalRecord.prescription },
              { label: "Additional Notes", value: medicalRecord.notes },
              {
                label: "Follow-up Required",
                value: medicalRecord.follow_up_required ? "Yes" : "No",
              },
              {
                label: "Follow-up Date",
                value: medicalRecord.follow_up_date
                  ? dayjs(medicalRecord.follow_up_date).format("MMM D, YYYY")
                  : "-",
              },
            ].map(({ label, value }, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    wordBreak: "break-word",
                  }}
                >
                  {value || "-"}
                </Typography>
                <Divider sx={{ mt: 1 }} />
              </Grid>
            ))}

            {/* Existing Files */}
            {medicalRecord.files?.length > 0 && (
              <Grid item xs={12} mt={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Attached Files
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1.5} mt={1}>
                  {medicalRecord.files.map((file: any) => (
                    <Chip
                      key={file.id}
                      label={
                        file.name.length > 20
                          ? file.name.slice(0, 20) + "..."
                          : file.name
                      }
                      component="a"
                      href={file.url}
                      target="_blank"
                      clickable
                      variant="outlined"
                      sx={{
                        borderColor: "#71C9CE",
                        color: "#71C9CE",
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        "&:hover": { bgcolor: "#e6f7f8" },
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default withAuth(MedicalRecordPage, "doctor");
