// components/patient/PatientImageCard.tsx
import { Box, CardContent } from "@mui/material";
import { AvatarUpload } from "../common/AvatarUpload";
import { ProfileInfo } from "../common/ProfileInfo";
import { BaseCard } from "../common/Card";
import { PatientProfile } from "@/types/patient";

interface PatientImageCardProps {
  patient: PatientProfile;
  onImageChange: (file: File) => Promise<void>;
  loading?: boolean;
  onEditClick?: () => void;
}

export const PatientImageCard = ({
  patient,
  onImageChange,
  loading,
  onEditClick,
}: PatientImageCardProps) => {
  const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${patient.personal_info.image?.url}`;

  return (
    <BaseCard>
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AvatarUpload
          src={imageUrl}
          alt={patient.personal_info.fullname}
          onFileChange={onImageChange}
          loading={loading}
        />

        <ProfileInfo
          name={patient.personal_info.fullname}
          id={patient.slug_id}
          onEditClick={onEditClick}
        />
      </CardContent>
    </BaseCard>
  );
};
