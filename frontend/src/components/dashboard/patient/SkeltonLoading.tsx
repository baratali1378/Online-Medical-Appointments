// components/patient/PatientProfileSkeleton.tsx
import { SkeletonGrid } from "@/components/loading/Skelton";

export const PatientProfileSkeleton = () => {
  return (
    <SkeletonGrid
      count={1}
      gridItems={[
        { xs: 12, md: 4, skeletonHeight: 300 },
        { xs: 12, md: 8, skeletonHeight: 500 },
      ]}
    />
  );
};
