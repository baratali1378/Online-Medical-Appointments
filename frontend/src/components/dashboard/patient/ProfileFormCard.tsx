import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Save, Cancel, Edit } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { PatientProfile, PatientProfileFormValues } from "@/types/patient";
import * as Yup from "yup";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";
import { FormSelectField } from "@/components/forms/fields/FormSelectField";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\+?[0-9\s-]+$/, "Invalid phone number")
    .required("Phone number is required"),
  birth: Yup.date().nullable(),
  city: Yup.string().nullable(),
  address: Yup.string().nullable(),
  postal_code: Yup.string().nullable(),
});

interface PatientFormCardProps {
  patient: PatientProfile;
  onSubmit: (data: Partial<PatientProfileFormValues>) => Promise<void>;
  loading?: boolean;
  error?: string;
  onEditToggle?: () => void;
}

const PatientFormCard = ({
  patient,
  onSubmit,
  loading,
  error,
  onEditToggle,
}: PatientFormCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [editMode, setEditMode] = useState(false);
  const { data: cities, isLoading } = useCitiesQuery();

  const cityOptions =
    cities?.map((city) => ({
      label: city.name,
      value: city.name,
    })) || [];

  const initialValues: PatientProfileFormValues = {
    address: patient.contact.address || undefined,
    postal_code: patient.contact.postal_code || undefined,
    fullname: patient.personal_info.fullname,
    email: patient.personal_info.email,
    phone_number: patient.contact.phone_number,
    birth: patient.personal_info.birth || "",
    city: patient.contact.city?.name || undefined,
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (onEditToggle) onEditToggle();
  };

  const handleSubmit = async (values: PatientProfileFormValues) => {
    await onSubmit(values);
    setEditMode(false);
  };

  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: "100%",
        position: "relative",
        overflow: "visible",
      }}
    >
      {loading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255,255,255,0.7)"
          zIndex={1}
          borderRadius={4}
        >
          <CircularProgress />
        </Box>
      )}

      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          flexWrap="wrap"
          gap={1}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
          >
            Personal Information
          </Typography>

          {editMode ? (
            <Box display="flex" gap={1}>
              <Button
                type="submit"
                form="patient-form"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                size={isMobile ? "small" : "medium"}
                disabled={loading}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Cancel />}
                onClick={toggleEditMode}
                size={isMobile ? "small" : "medium"}
                disabled={loading}
              >
                Cancel
              </Button>
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
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, handleChange }) => (
            <Form id="patient-form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Full Name"
                    name="fullname"
                    value={values.fullname}
                    onChange={handleChange}
                    disabled={!editMode || loading}
                    error={touched.fullname && Boolean(errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    multiline
                    onChange={handleChange}
                    disabled={!editMode || loading}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={values.phone_number}
                    onChange={handleChange}
                    disabled={!editMode || loading}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Date of Birth"
                    name="birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={values.birth}
                    onChange={handleChange}
                    disabled={!editMode || loading}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>

                {/* City field */}
                <Grid item xs={12} sm={6}>
                  <FormSelectField
                    name={"city"}
                    label={"City"}
                    options={isLoading ? [] : cityOptions}
                    disabled={!editMode || loading}
                  />
                </Grid>

                {/* Address field: multiline, maxRows=4, wider if no city and no postal_code */}
                <Grid
                  item
                  xs={12}
                  sm={!values.city && !values.postal_code ? 12 : 6}
                >
                  <Field
                    as={TextField}
                    fullWidth
                    label="Address"
                    name="address"
                    multiline
                    maxRows={4}
                    value={values.address}
                    onChange={handleChange}
                    disabled={!editMode || loading}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>

                {/* Postal Code field */}
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Postal Code"
                    name="postal_code"
                    value={values.postal_code || ""}
                    onChange={handleChange}
                    disabled={!editMode || loading}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default PatientFormCard;
