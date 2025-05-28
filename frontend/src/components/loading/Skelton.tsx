import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import { ReactNode } from "react";

type SkeletonVariant = "rounded" | "text" | "rectangular" | "circular";

interface SkeletonGridProps {
  count?: number;
  gridItems?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    skeletonHeight?: number | string;
  }[];
  containerSpacing?: number;
  px?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  py?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  children?: ReactNode;
  variant?: SkeletonVariant;
}

export const SkeletonGrid = ({
  count = 1,
  gridItems = [
    { xs: 12, md: 4, skeletonHeight: 300 },
    { xs: 12, md: 8, skeletonHeight: 400 },
  ],
  containerSpacing = 3,
  px = { xs: 1.5, sm: 3, md: 4 },
  py = { xs: 2, md: 3 },
  children,
  variant = "rounded",
}: SkeletonGridProps) => {
  return (
    <Box px={px} py={py}>
      <Grid container spacing={containerSpacing}>
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>
            {gridItems.map((item, itemIndex) => (
              <Grid
                item
                xs={item.xs || 12}
                sm={item.sm}
                md={item.md}
                lg={item.lg}
                key={`${index}-${itemIndex}`}
              >
                {children || (
                  <Skeleton
                    variant={variant}
                    height={item.skeletonHeight || 300}
                    width="100%"
                  />
                )}
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};
