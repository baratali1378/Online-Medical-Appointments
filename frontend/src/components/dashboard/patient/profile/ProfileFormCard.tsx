import { useState } from "react";
import {
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Grid,
  Alert,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Save, Cancel, Edit, MoreVert, Lock } from "@mui/icons-material";
import { Formik, Form } from "formik";
import { PatientProfile, PatientProfileFormValues } from "@/types/patient";
import { BaseCard } from "../../common/Card";
import { ProfileValidation } from "@/utils/validation";
import { FormTextField, FormGridSelectField } from "../../common/FormFields";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";
import ChangePasswordDialog from "@/components/dashboard/common/ChangepasswordDialog";

interface PatientFormCardProps {
  patient: PatientProfile;
  onSubmit: (data: Partial<PatientProfileFormValues>) => Promise<void>;
  loading?: boolean;
  error?: string;
  onEditToggle?: () => void;
  token: string;
}

export const PatientFormCard = ({
  patient,
  onSubmit,
  loading,
  error,
  onEditToggle,
  token,
}: PatientFormCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [editMode, setEditMode] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { data: cities, isLoading } = useCitiesQuery();

  const cityOptions =
    cities?.map((city) => ({
      label: city.name,
      value: city.name,
    })) || [];

  const initialValues: PatientProfileFormValues = {
    address: patient.contact.address || "",
    postal_code: patient.contact.postal_code || "",
    fullname: patient.personal_info.fullname,
    email: patient.personal_info.email,
    phone_number: patient.contact.phone_number,
    birth: patient.personal_info.birth || "",
    city: patient.contact.city?.name || "",
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    onEditToggle?.();
  };

  const handleSubmit = async (values: PatientProfileFormValues) => {
    await onSubmit(values);
    setEditMode(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <BaseCard
      title="Personal Information"
      loading={loading}
      headerActions={
        editMode ? (
          <Box display="flex" gap={1} alignItems="center">
            {isMobile ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      setPasswordDialogOpen(true);
                      handleMenuClose();
                    }}
                  >
                    <Lock fontSize="small" sx={{ mr: 1 }} /> Change Password
                  </MenuItem>
                  <MenuItem onClick={toggleEditMode} disabled={loading}>
                    <Cancel fontSize="small" sx={{ mr: 1 }} /> Cancel
                  </MenuItem>
                </Menu>
                <Button
                  type="submit"
                  form="patient-form"
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  size="small"
                  disabled={loading}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  form="patient-form"
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  disabled={loading}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<Cancel />}
                  onClick={toggleEditMode}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Lock />}
                  onClick={() => setPasswordDialogOpen(true)}
                >
                  Change Password
                </Button>
              </>
            )}
            <ChangePasswordDialog
              open={passwordDialogOpen}
              onClose={() => setPasswordDialogOpen(false)}
              role="patient"
              token={token}
            />
          </Box>
        ) : (
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={toggleEditMode}
            size={isMobile ? "small" : "medium"}
          >
            Edit Profile
          </Button>
        )
      }
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form id="patient-form">
            <Grid container spacing={2}>
              <FormTextField
                name="fullname"
                label="Full Name"
                disabled={!editMode || loading}
              />
              <FormTextField
                name="email"
                label="Email"
                type="email"
                disabled={!editMode || loading}
              />
              <FormTextField
                name="phone_number"
                label="Phone Number"
                disabled={!editMode || loading}
              />
              <FormTextField
                name="birth"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                disabled={!editMode || loading}
              />
              <FormGridSelectField
                name="city"
                label="City"
                options={isLoading ? [] : cityOptions}
                disabled={!editMode || loading}
              />
              <FormTextField
                name="address"
                label="Address"
                multiline
                maxRows={4}
                disabled={!editMode || loading}
              />
              <FormTextField
                name="postal_code"
                label="Postal Code"
                disabled={!editMode || loading}
              />
            </Grid>
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
