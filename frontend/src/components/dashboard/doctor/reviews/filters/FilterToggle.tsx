import { Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Props {
  expanded: boolean;
  onToggle: () => void;
}

export default function FilterToggle({ expanded, onToggle }: Props) {
  return (
    <Button
      fullWidth
      startIcon={<FilterListIcon />}
      onClick={onToggle}
      sx={{
        justifyContent: "flex-start",
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 500,
      }}
    >
      {expanded ? "Hide Filters" : "Show Filters"}
    </Button>
  );
}
