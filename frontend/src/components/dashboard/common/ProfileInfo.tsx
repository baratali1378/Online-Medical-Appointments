// components/profile/ProfileInfo.tsx
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface ProfileInfoProps {
  name: string;
  id?: string;
  onEditClick?: () => void;
}

export const ProfileInfo = ({ name, id, onEditClick }: ProfileInfoProps) => {
  const theme = useTheme();

  return (
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
        {name}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        {id && (
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
            ID: {id}
          </Typography>
        )}

        {onEditClick && (
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
        )}
      </Box>
    </Box>
  );
};
