// PersonalInfoStep.tsx
import { Box } from "@mui/material";
import { FormTextField } from "@/components/forms/fields/FormTextField";
import { PasswordField } from "@/components/forms/fields/FormPasswordField";
import { FormSelectField } from "@/components/forms/fields/FormSelectField";

interface PersonalInfoStepProps {
  emailLabel?: string;
  passwordLabel?: string;
  nameLabel?: string;
  nameField?: string;
  includeGender?: boolean;
  genderLabel?: string;
  genderField?: string;
  genderOptions?: { label: string; value: string }[];
}

const defaultGenderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Others" },
];

const PersonalInfoStep = ({
  emailLabel = "Email",
  passwordLabel = "Password",
  nameLabel = "Full Name",
  nameField = "name",
  includeGender = false,
  genderLabel = "Gender",
  genderField = "gender",
  genderOptions = defaultGenderOptions,
}: PersonalInfoStepProps) => (
  <Box display="grid" gap={2}>
    <FormTextField name={nameField} label={nameLabel} type="text" />
    <FormTextField name="email" label={emailLabel} type="email" />
    <PasswordField type="password" name="password" label={passwordLabel} />
    {includeGender && (
      <FormSelectField
        name={genderField}
        label={genderLabel}
        options={genderOptions}
      />
    )}
  </Box>
);

export default PersonalInfoStep;
