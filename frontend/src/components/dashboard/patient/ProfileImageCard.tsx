import { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  useTheme,
} from "@mui/material";
import { PhotoCamera, Edit } from "@mui/icons-material";
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
  const image = `${process.env.NEXT_PUBLIC_STRAPI_URL}${patient.personal_info.image?.url}`;
  console.log(image);

  const theme = useTheme();
  const [hover, setHover] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      await onImageChange(e.target.files[0]);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-5px)" },
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          position="relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{ mb: 2 }}
        >
          <Avatar
            alt={patient.personal_info.fullname}
            src={image}
            sx={{
              width: { xs: 100, sm: 120, md: 140 },
              height: { xs: 100, sm: 120, md: 140 },
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
                id="patient-image-upload"
                type="file"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label htmlFor="patient-image-upload">
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

        <Box textAlign="center" width="100%">
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              mb: 0.5,
              wordBreak: "break-word",
            }}
          >
            {patient.personal_info.fullname}
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: theme.palette.grey[100],
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
              }}
            >
              ID: {patient.slug_id || "N/A"}
            </Typography>

            <Tooltip title="Edit Profile">
              <IconButton
                size="small"
                onClick={onEditClick}
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  "&:hover": { backgroundColor: theme.palette.grey[300] },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PatientImageCard;
