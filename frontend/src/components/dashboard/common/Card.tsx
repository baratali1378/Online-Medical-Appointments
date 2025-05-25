// components/common/Card.tsx
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

interface BaseCardProps {
  title?: string;
  children: ReactNode;
  loading?: boolean;
  headerActions?: ReactNode;
}

export const BaseCard = ({
  title,
  children,
  loading,
  headerActions,
}: BaseCardProps) => (
  <Card
    sx={{
      p: { xs: 2, md: 3 },
      borderRadius: 4,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      height: "100%",
      position: "relative",
      overflow: "visible",
    }}
  >
    {loading && (
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(255,255,255,0.7)"
        zIndex={1}
        borderRadius={4}
      >
        <CircularProgress />
      </Box>
    )}

    <CardContent>
      {(title || headerActions) && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            flexWrap="wrap"
            gap={1}
          >
            {title && (
              <Typography
                variant="h6"
                sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
              >
                {title}
              </Typography>
            )}
            {headerActions}
          </Box>
          <Divider sx={{ mb: 3 }} />
        </>
      )}
      {children}
    </CardContent>
  </Card>
);
