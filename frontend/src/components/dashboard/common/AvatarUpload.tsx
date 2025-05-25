// components/common/AvatarUpload.tsx
import { Avatar, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";

interface AvatarUploadProps {
  src?: string;
  alt: string;
  onFileChange: (file: File) => void;
  loading?: boolean;
  size?: number | { xs: number; sm: number; md: number };
}

export const AvatarUpload = ({
  src,
  alt,
  onFileChange,
  loading,
  size = { xs: 100, sm: 120, md: 140 },
}: AvatarUploadProps) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const sizeValue = typeof size === "number" ? size : size;

  return (
    <Box
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Avatar
        alt={alt}
        src={src}
        sx={{
          width: sizeValue,
          height: sizeValue,
          border: `3px solid ${theme.palette.primary.main}`,
          opacity: loading ? 0.7 : 1,
          transition: "all 0.3s ease",
          transform: hover ? "scale(1.05)" : "scale(1)",
        }}
      />
      {hover && (
        <>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="avatar-upload"
            type="file"
            onChange={handleFileChange}
            disabled={loading}
          />
          <label htmlFor="avatar-upload">
            <IconButton
              color="primary"
              component="span"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "primary.main",
                  "& .MuiSvgIcon-root": { color: "common.white" },
                },
              }}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </>
      )}
    </Box>
  );
};
