// EmptyState.tsx
import { Box, Typography, useTheme } from "@mui/material";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: React.ReactNode;
  sx?: object;
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  sx,
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
        color: theme.palette.text.secondary,
        ...sx,
      }}
    >
      {icon && (
        <Typography
          variant="h3"
          sx={{ mb: 2, fontSize: "3rem", lineHeight: 1 }}
        >
          {icon}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" sx={{ maxWidth: "400px", mb: 3 }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
};
