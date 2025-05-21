// components/signup/steps/FinalStep.tsx
import { Box, Typography } from "@mui/material";

interface FinalStepProps {
  title?: string;
  description?: string;
}

const FinalStep = ({
  title = "Confirm your details and submit",
  description = "Once you click submit, your account will be created.",
}: FinalStepProps) => (
  <Box textAlign="center">
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

export default FinalStep;
