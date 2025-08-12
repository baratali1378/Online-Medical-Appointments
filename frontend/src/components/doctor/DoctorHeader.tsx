import { Box, Typography, Chip, Stack } from "@mui/material";
import { DoctorDetails as Doctor } from "@/types/doctor";
import VerificationBadge from "./VerificationBadge";

interface Props {
  doctor: Doctor;
}

export default function DoctorHeader({ doctor }: Props) {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          {doctor.personal_info.fullname}
        </Typography>
        {doctor.security?.is_verified && <VerificationBadge />}
      </Stack>
      <Typography variant="subtitle1" color="text.secondary">
        {doctor.city?.name || "Unknown City"}
      </Typography>
      <Stack direction="row" spacing={1} mt={1}>
        {doctor.specialties.map((spec) => (
          <Chip
            key={spec.id}
            label={spec.name}
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
    </Box>
  );
}
