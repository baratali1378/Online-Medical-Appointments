import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ProfileImageCard from "./ProfileImageCard";
import ProfileFormCard from "./ProfileFormCard";
import { PatientProfile, SignupFormValues } from "@/types/patient";

interface PatientProfileViewProps {
  patient: PatientProfile;
  onUpdate: (data: Partial<SignupFormValues>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  onRefresh: () => Promise<void>;
}

const PatientProfileView = ({
  patient,
  onUpdate,
  onImageUpload,
  onRefresh,
}: PatientProfileViewProps) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const imageUrl = patient.image?.url || "";

  return (
    <Box px={2} py={4} maxWidth="1200px" mx="auto">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProfileImageCard
            imageUrl={imageUrl}
            fullname={patient.fullname}
            slugId={patient.slug_id || ""}
            onImageChange={onImageUpload}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProfileFormCard
            patient={patient}
            onSubmit={onUpdate}
            onRefetch={onRefresh}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientProfileView;
