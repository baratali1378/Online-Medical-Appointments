"use client";

import { CardContent, Box, useMediaQuery, useTheme } from "@mui/material";
import { AvatarUpload } from "./AvatarUpload";
import { ProfileInfo } from "./ProfileInfo";
import { BaseCard } from "./Card";

interface ProfileImageCardProps {
  imageUrl?: string;
  name: string;
  id: string;
  onImageChange: (file: File) => Promise<void>;
  loading?: boolean;
  onEditClick?: () => void;
}

export const ProfileImageCard = ({
  imageUrl,
  name,
  id,
  onImageChange,
  loading,
  onEditClick,
}: ProfileImageCardProps) => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const avatarSize = isSmall ? 120 : 200;

  return (
    <BaseCard>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          py={2}
        >
          <AvatarUpload
            src={url}
            alt={name}
            onFileChange={onImageChange}
            loading={loading}
            size={avatarSize} // Responsive size
          />

          <ProfileInfo name={name} id={id} onEditClick={onEditClick} />
        </Box>
      </CardContent>
    </BaseCard>
  );
};
