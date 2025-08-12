import { Typography, Card, CardContent } from "@mui/material";
import { ClinicInfo } from "@/types/doctor";

interface Props {
  biography?: string;
  clinicInfo?: ClinicInfo;
}

export default function DoctorBiography({ biography, clinicInfo }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" paragraph>
          {biography || "No biography available."}
        </Typography>

        {clinicInfo && (
          <>
            <Typography variant="h6" gutterBottom>
              Clinic Info
            </Typography>
            <Typography variant="body2">{clinicInfo.clinic_name}</Typography>
            <Typography variant="body2">{clinicInfo.address}</Typography>
            <Typography variant="body2">📞 {clinicInfo.phone}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}
