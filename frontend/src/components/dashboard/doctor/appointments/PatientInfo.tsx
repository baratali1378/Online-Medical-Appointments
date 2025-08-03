import { DoctorAppointment } from "@/types/appointments";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import Link from "next/link";

export const PatientInfo = ({
  patient,
  apiUrl,
}: {
  patient: DoctorAppointment["patient"];
  apiUrl: string | undefined;
}) => {
  const age =
    new Date().getFullYear() -
    new Date(patient.personal_info.birth || "2000").getFullYear();

  return (
    <Link
      href={`/dashboard/doctor/patients/${patient.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: 0.85 },
        }}
      >
        <Avatar
          src={
            patient.personal_info.image?.url
              ? `${apiUrl}${patient.personal_info.image.url}`
              : "/default-avatar.png"
          }
          alt={patient.personal_info.fullname || "Patient"}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography fontWeight={600} variant="body1">
            {patient.personal_info.fullname || "Unnamed"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {age} yrs • {patient.personal_info.gender || "N/A"}
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
};
