import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useState } from "react";
import { Formik, Form } from "formik";
import {
  PatientProfile,
  SignupFormValues,
  genderOptions,
} from "@/types/patient";
import { patientProfileSchema } from "@/utils/validation";

interface Props {
  patient: PatientProfile;
  onSubmit: (data: Partial<SignupFormValues>) => Promise<void>;
  onRefetch: () => Promise<void>;
}

const ProfileFormCard = ({ patient, onSubmit, onRefetch }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const initialValues: SignupFormValues = {
    fullname: patient.fullname || "",
    email: patient.email || "",
    phone: patient.phone || "",
    birth: patient.birth || "",
    gender: patient.gender || "",
    password: "",
  };

  const handleFormSubmit = async (values: SignupFormValues) => {
    await onSubmit(values);
    setEditMode(false);
    await onRefetch();
  };

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6">Personal Information</Typography>
          {editMode ? (
            <Box display="flex" gap={1}>
              <Button
                type="submit"
                form="profile-form"
                variant="contained"
                color="primary"
                startIcon={<Save />}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Formik
          initialValues={initialValues}
          validationSchema={patientProfileSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange }) => (
            <Form id="profile-form">
              <Grid container spacing={2}>
                {[
                  {
                    label: "Full Name",
                    name: "fullname",
                    type: "text",
                  },
                  {
                    label: "Gender",
                    name: "gender",
                    select: true,
                    options: genderOptions,
                  },
                  {
                    label: "Date of Birth",
                    name: "birth",
                    type: "date",
                  },
                  {
                    label: "Phone Number",
                    name: "phone",
                    type: "text",
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                  },
                ].map((field, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={field.name === "email" ? 12 : 6}
                    key={index}
                  >
                    <TextField
                      fullWidth
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      value={values[field.name as keyof SignupFormValues]}
                      onChange={handleChange}
                      disabled={!editMode}
                      select={!!field.select}
                      SelectProps={field.select ? { native: true } : undefined}
                      InputLabelProps={
                        field.type === "date" ? { shrink: true } : undefined
                      }
                      error={
                        touched[field.name as keyof SignupFormValues] &&
                        Boolean(errors[field.name as keyof SignupFormValues])
                      }
                      helperText={
                        touched[field.name as keyof SignupFormValues] &&
                        errors[field.name as keyof SignupFormValues]
                      }
                    >
                      {field.select &&
                        [<option key="" value=""></option>].concat(
                          field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          )) || []
                        )}
                    </TextField>
                  </Grid>
                ))}
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ProfileFormCard;
