import React from "react";
import { Box, Skeleton } from "@mui/material";

export default function SkeletonCard() {
  return (
    <Box
      sx={{
        height: "100%",
        maxWidth: 300,
        mx: "auto",
        p: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <Skeleton
          variant="circular"
          width={100}
          height={100}
          animation="wave"
        />
      </Box>
      <Box sx={{ p: 2, pt: 1 }}>
        <Skeleton
          width="80%"
          height={24}
          animation="wave"
          sx={{ mx: "auto" }}
        />
        <Skeleton
          width="60%"
          height={20}
          animation="wave"
          sx={{ mt: 1, mx: "auto" }}
        />
        <Skeleton
          width="50%"
          height={18}
          animation="wave"
          sx={{ mt: 1, mx: "auto" }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Skeleton width={80} height={20} animation="wave" />
          <Skeleton width={40} height={18} animation="wave" sx={{ ml: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}
