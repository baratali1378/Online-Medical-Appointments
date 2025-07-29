import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface SliderControlsProps {
  direction: "prev" | "next";
  onClick: () => void;
  position: { left?: number; right?: number };
}

export const SliderControls = ({
  direction,
  onClick,
  position,
}: SliderControlsProps) => (
  <IconButton
    className={`specialty-${direction}`}
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "35%",
      transform: "translateY(-50%)",
      zIndex: 2,
      bgcolor: "background.paper",
      boxShadow: 3,
      "&:hover": { bgcolor: "background.paper" },
      ...position,
    }}
  >
    {direction === "prev" ? (
      <ChevronLeft fontSize="large" />
    ) : (
      <ChevronRight fontSize="large" />
    )}
  </IconButton>
);
