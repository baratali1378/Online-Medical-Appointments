import { Appointment } from "@/types/appointments";
import { Avatar, Box, Stack, Typography } from "@mui/material";

// Patient info display
export const PatientInfo = ({
  patient,
  apiUrl,
}: {
  patient: Appointment["patient"];
  apiUrl: string | undefined;
}) => {
  const age =
    new Date().getFullYear() - new Date(patient.birth || "2000").getFullYear();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src={
          patient.image?.url
            ? `${apiUrl}${patient.image.url}`
            : "/default-avatar.png"
        }
        alt={patient.fullname || "Patient"}
        sx={{ width: 48, height: 48 }}
      />
      <Box>
        <Typography fontWeight={600} variant="body1">
          {patient.fullname || "Unnamed"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {age} yrs • {patient.gender || "N/A"}
        </Typography>
      </Box>
    </Stack>
  );
};
