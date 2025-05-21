// components/signup/steps/PersonalInfoStep.tsx
import { Box } from "@mui/material";
import { FormTextField } from "@/components/forms/fields/FormTextField";
import { PasswordField } from "@/components/forms/fields/FormPasswordField";

interface PersonalInfoStepProps {
  emailLabel?: string;
  passwordLabel?: string;
  nameLabel?: string;
  nameField?: string; // <-- allow customization of the "name" field key
}

const PersonalInfoStep = ({
  emailLabel = "Email",
  passwordLabel = "Password",
  nameLabel = "Full Name",
  nameField = "name", // <-- default to "name"
}: PersonalInfoStepProps) => (
  <Box display="grid" gap={2}>
    <FormTextField name={nameField} label={nameLabel} type="text" />
    <FormTextField name="email" label={emailLabel} type="email" />
    <PasswordField type="password" name="password" label={passwordLabel} />
  </Box>
);

export default PersonalInfoStep;
