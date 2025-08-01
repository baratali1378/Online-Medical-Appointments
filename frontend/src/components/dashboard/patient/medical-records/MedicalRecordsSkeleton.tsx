import React from "react";
import { Skeleton, Stack, Box } from "@mui/material";

const MedicalRecordsSkeleton: React.FC = () => {
  return (
    <Stack spacing={3}>
      {[...Array(3)].map((_, index) => (
        <Box key={index} sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Box>
                <Skeleton variant="text" width={200} height={30} />
                <Skeleton variant="text" width={150} height={20} />
              </Box>
            </Stack>
            <Skeleton variant="rectangular" width={120} height={24} />
            <Stack spacing={1.5}>
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default MedicalRecordsSkeleton;
