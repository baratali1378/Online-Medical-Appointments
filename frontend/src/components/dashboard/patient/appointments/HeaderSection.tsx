import { Avatar, Box, Typography } from "@mui/material";

interface Props {
  fullName: string;
  url: string;
  todayCount: number;
}

export function HeaderSection({ fullName, url, todayCount }: Props) {
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar src={url} alt={fullName} sx={{ width: 56, height: 56 }} />
      <Box>
        <Typography variant="h6">Welcome, {fullName}</Typography>
        <Typography variant="body2" color="text.secondary">
          You have {todayCount} appointment{todayCount !== 1 ? "s" : ""}
        </Typography>
      </Box>
    </Box>
  );
}
