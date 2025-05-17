import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

interface Props {
  imageUrl: string | undefined;
  fullname: string;
  slugId?: string;
  onImageChange: (file: File) => void;
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const ProfileImageCard = ({
  imageUrl,
  fullname,
  slugId,
  onImageChange,
}: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent>
        <Box position="relative" mb={2}>
          <Avatar
            src={`${API_URL}${imageUrl}`}
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              boxShadow: 2,
              border: `4px solid ${theme.palette.primary.main}`,
            }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImageChange(file);
              }}
            />
            <CameraAlt />
          </IconButton>
        </Box>
        <Typography variant="h6" gutterBottom>
          {fullname}
        </Typography>
        <Typography color="text.secondary">
          {slugId || "No patient ID"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileImageCard;
