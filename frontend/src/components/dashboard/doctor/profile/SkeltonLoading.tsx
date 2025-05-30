import { SkeletonGrid } from "@/components/loading/Skelton";
import { Box, Grid2, Skeleton } from "@mui/material";

export default function Skelton() {
  return (
    <Box
      px={{ xs: 1.5, sm: 3, md: 4 }}
      py={{ xs: 2, md: 3 }}
      maxWidth="1400px"
      mx="auto"
    >
      <Grid2 container spacing={3} direction="column">
        {/* Profile Image Skeleton */}
        <Grid2>
          <Box display="flex" alignItems="center" gap={3}>
            <Skeleton variant="circular" width={120} height={120} />
            <Box flexGrow={1}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={30} sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Grid2>

        {/* Personal Info Skeleton */}
        <Grid2>
          <SkeletonGrid
            gridItems={[
              { xs: 12, sm: 6, skeletonHeight: 56 },
              { xs: 12, sm: 6, skeletonHeight: 56 },
              { xs: 12, sm: 6, skeletonHeight: 56 },
              { xs: 12, sm: 6, skeletonHeight: 56 },
            ]}
            containerSpacing={2}
          />
        </Grid2>

        {/* Phone Numbers Skeleton */}
        <Grid2>
          <SkeletonGrid
            gridItems={[
              { xs: 12, skeletonHeight: 56 },
              { xs: 12, skeletonHeight: 56 },
            ]}
          />
        </Grid2>

        {/* Specialties Skeleton */}
        <Grid2>
          <SkeletonGrid
            gridItems={[
              { xs: 12, sm: 6, md: 4, skeletonHeight: 80 },
              { xs: 12, sm: 6, md: 4, skeletonHeight: 80 },
              { xs: 12, sm: 6, md: 4, skeletonHeight: 80 },
            ]}
          />
        </Grid2>

        {/* Available Slots Skeleton */}
        <Grid2>
          <SkeletonGrid
            gridItems={[
              { xs: 12, skeletonHeight: 56 },
              { xs: 12, skeletonHeight: 56 },
            ]}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
