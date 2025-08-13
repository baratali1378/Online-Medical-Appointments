"use client";

import { Box, Divider, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  noDivider?: boolean;
}

export function FilterSection({
  title,
  children,
  noDivider,
}: FilterSectionProps) {
  return (
    <>
      <Box>
        <Typography
          color="#71C9CE"
          variant="body1"
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {title}
        </Typography>
        {children}
      </Box>
      {!noDivider && <Divider />}
    </>
  );
}
