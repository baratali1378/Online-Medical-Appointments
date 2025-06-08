import {
  Button,
  CircularProgress,
  darken,
  Stack,
  useTheme,
} from "@mui/material";

// Reusable ActionButton component
const ActionButton = ({
  label,
  onClick,
  color,
  loading,
  fullWidth,
}: {
  label: string;
  onClick?: () => void;
  color?: string;
  loading?: boolean;
  fullWidth?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Button
      size="small"
      variant="contained"
      onClick={onClick}
      disabled={loading}
      fullWidth={fullWidth}
      sx={{
        backgroundColor: color || theme.palette.primary.main,
        color: "#fff",
        "&:hover": {
          backgroundColor: color
            ? darken(color, 0.15)
            : theme.palette.primary.dark,
        },
        whiteSpace: "nowrap",
      }}
    >
      {loading ? <CircularProgress size={18} color="inherit" /> : label}
    </Button>
  );
};

export const AppointmentActions = ({
  status,
  onChangeStatus,
  isLoading,
  isMobile,
}: {
  status: string;
  onChangeStatus: (newStatus: string) => void;
  isLoading: boolean;
  isMobile: boolean;
}) => {
  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={1}
      sx={{ width: isMobile ? "100%" : "auto", mt: isMobile ? 1 : 0 }}
    >
      {status === "Pending" && (
        <ActionButton
          label="Confirm"
          onClick={() => onChangeStatus("Confirmed")}
          color="#FFA000"
          loading={isLoading}
          fullWidth={isMobile}
        />
      )}

      {status === "Confirmed" && (
        <>
          <ActionButton
            label="Cancel"
            onClick={() => onChangeStatus("Cancelled")}
            color="#D32F2F"
            loading={isLoading}
            fullWidth={isMobile}
          />
          <ActionButton
            label="Start"
            color="#2E7D32"
            fullWidth={isMobile}
            onClick={() => onChangeStatus("Completed")}
          />
        </>
      )}
    </Stack>
  );
};
