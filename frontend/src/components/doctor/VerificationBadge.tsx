import { Chip } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function VerificationBadge() {
  return (
    <Chip
      icon={<VerifiedIcon />}
      label="Verified"
      color="success"
      size="small"
    />
  );
}
