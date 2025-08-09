// components/doctor/VerifiedBadge.tsx
import { Box, Tooltip } from "@mui/material";
import { Verified } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

interface VerifiedBadgeProps {
  size?: "small" | "medium" | "large";
  position?: "absolute" | "relative";
  withTooltip?: boolean;
  sx?: SxProps;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = "medium",
  position = "absolute",
  withTooltip = true,
  sx = {},
}) => {
  const theme = useTheme();

  const getSize = () => {
    switch (size) {
      case "small":
        return { box: 20, icon: 14 };
      case "large":
        return { box: 28, icon: 20 };
      default:
        return { box: 24, icon: 16 };
    }
  };

  const { box, icon } = getSize();

  const badge = (
    <Box
      position={position}
      bgcolor={theme.palette.primary.main}
      borderRadius="50%"
      p={0.5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: box,
        height: box,
        border: `2px solid ${theme.palette.background.paper}`,
        boxShadow: theme.shadows[1],
        ...sx,
      }}
    >
      <Verified
        sx={{
          color: "white",
          fontSize: icon,
        }}
      />
    </Box>
  );

  return withTooltip ? (
    <Tooltip title="Verified Professional" arrow>
      {badge}
    </Tooltip>
  ) : (
    badge
  );
};

export default VerifiedBadge;
