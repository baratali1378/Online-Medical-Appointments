// components/HeaderSection.tsx
import {
  Avatar,
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface HeaderSectionProps {
  fullName: string;
  url: string;
  todayCount: number;
}

export const HeaderSection = ({
  fullName,
  url,
  todayCount,
}: HeaderSectionProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      px={isMobile ? 2 : 3}
      py={isMobile ? 2 : 3}
      mb={3}
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="space-between"
      alignItems={isMobile ? "flex-start" : "center"}
      gap={isMobile ? 2 : 4}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Left section: Avatar + Doctor Info */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={url || "/default-avatar.png"}
          alt={fullName}
          sx={{
            width: 56,
            height: 56,
            border: `2px solid ${theme.palette.primary.main}`,
          }}
        />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Doctor / Specialist
          </Typography>
        </Box>
      </Stack>

      {/* Right section: Appointment count */}
      <Typography
        variant={isMobile ? "body1" : "h6"}
        fontWeight={500}
        color="#71C9CE"
      >
        Today’s Appointments: {todayCount}
      </Typography>
    </Box>
  );
};
