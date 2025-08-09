// components/doctor/SpecialtyChip.tsx
import { Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SpecialtyChipProps {
  specialty: string;
}

const SpecialtyChip: React.FC<SpecialtyChipProps> = ({ specialty }) => {
  const theme = useTheme();

  return (
    <Chip
      label={specialty}
      size="small"
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
        alignSelf: "flex-start",
      }}
    />
  );
};

export default SpecialtyChip;
