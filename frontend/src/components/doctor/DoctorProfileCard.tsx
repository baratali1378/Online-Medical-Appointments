import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { DoctorDetails as Doctor } from "@/types/doctor";
import StarIcon from "@mui/icons-material/Star";

interface Props {
  doctor: Doctor;
}

export default function DoctorProfileCard({ doctor }: Props) {
  return (
    <Card sx={{ p: 2 }}>
      <Stack alignItems="center" spacing={2}>
        <Avatar
          src={doctor.personal_info.image?.url}
          alt={doctor.personal_info.fullname}
          sx={{ width: 120, height: 120 }}
        />
        <Typography variant="h6">
          {doctor.experience} years experience
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <StarIcon color="warning" />
          <Typography variant="body1">
            {doctor.rating || "N/A"} ({doctor.reviewCount || 0} reviews)
          </Typography>
        </Stack>
        <Divider flexItem sx={{ my: 1 }} />
        {doctor.clinic_info && (
          <>
            <Typography variant="subtitle1" fontWeight="bold">
              {doctor.clinic_info.clinic_name}
            </Typography>
            <Typography variant="body2">
              {doctor.clinic_info.address}
            </Typography>
            <Typography variant="body2">
              📞 {doctor.clinic_info.phone}
            </Typography>
          </>
        )}
        <Button variant="contained" color="primary" fullWidth>
          Book Appointment
        </Button>
      </Stack>
    </Card>
  );
}
