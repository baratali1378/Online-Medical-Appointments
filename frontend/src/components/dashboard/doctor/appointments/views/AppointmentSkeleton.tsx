import { Skeleton, Stack } from "@mui/material";

export const AppointmentSkeleton = () => (
  <Stack
    spacing={2}
    direction="row"
    alignItems="center"
    p={2}
    borderRadius={1}
    boxShadow={1}
    bgcolor="background.paper"
  >
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="text" width="80%" height={24} />
  </Stack>
);
