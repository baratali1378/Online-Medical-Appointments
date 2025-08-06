"use client";

import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormTextField } from "@/components/forms/fields/FormTextField";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  chief_complaint: Yup.string()
    .required("Chief complaint is required")
    .max(500, "Too long"),
  symptoms: Yup.string().nullable(),
  diagnoses: Yup.string().nullable(),
  treatment_plan: Yup.string().nullable(),
  prescription: Yup.string().nullable(),
  notes: Yup.string().nullable(),
  follow_up_required: Yup.boolean(),
  follow_up_date: Yup.date()
    .nullable()
    .when("follow_up_required", {
      is: true,
      then: (schema) =>
        schema.required("Follow-up date is required when enabled"),
    }),
  files: Yup.array().of(Yup.mixed()).nullable(),
});

function SectionPaper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
      <Typography variant="h6" mb={2} fontWeight="medium" color="#71C9CE">
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

type MedicalRecordFormProps = {
  initialValues: any;
  onSubmit: (values: any) => void;
  isSubmitting: boolean;
  isPending: boolean;
  title: string;
  submitLabel: string;
  existingFiles?: any[];
};

export function MedicalRecordForm({
  initialValues,
  onSubmit,
  isSubmitting,
  isPending,
  title,
  submitLabel,
  existingFiles = [],
}: MedicalRecordFormProps) {
  const router = useRouter();
  const getFullFileUrl = (fileUrl: string) => {
    if (!fileUrl) return "";
    return fileUrl.startsWith("http")
      ? fileUrl
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || ""}${fileUrl}`;
  };

  return (
    <Box maxWidth="md" mx="auto" p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        color="#71C9CE"
        textAlign="center"
      >
        {title}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, dirty }) => (
          <Form>
            <SectionPaper title="Clinical Information">
              <Grid container spacing={3}>
                {[
                  { name: "chief_complaint", label: "Chief Complaint" },
                  { name: "symptoms", label: "Symptoms" },
                  { name: "diagnoses", label: "Diagnoses" },
                  { name: "treatment_plan", label: "Treatment Plan" },
                  { name: "prescription", label: "Prescription" },
                  { name: "notes", label: "Additional Notes" },
                ].map(({ name, label }) => (
                  <Grid item xs={12} key={name}>
                    <FormTextField
                      multiline
                      rows={3}
                      name={name}
                      label={label}
                      placeholder={`Enter ${label.toLowerCase()}...`}
                    />
                  </Grid>
                ))}
              </Grid>
            </SectionPaper>

            {existingFiles?.length > 0 && (
              <SectionPaper title="Existing Files">
                <List dense>
                  {existingFiles.map((file: any) => (
                    <ListItem key={file.id}>
                      <ListItemText
                        primary={
                          <a
                            href={getFullFileUrl(file.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.name}
                          </a>
                        }
                        secondary={`${file.size.toFixed(1)} KB`}
                      />
                    </ListItem>
                  ))}
                </List>
              </SectionPaper>
            )}

            <SectionPaper title="Attach Files">
              <FieldArray
                name="files"
                render={(arrayHelpers) => (
                  <>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadFileIcon />}
                      sx={{ mb: 2 }}
                    >
                      Upload Files
                      <input
                        type="file"
                        hidden
                        multiple
                        onChange={(event) => {
                          if (event.currentTarget.files) {
                            const newFiles = Array.from(
                              event.currentTarget.files
                            );
                            newFiles.forEach((file) => arrayHelpers.push(file));
                            event.currentTarget.value = ""; // reset input
                          }
                        }}
                      />
                    </Button>

                    {values.files.length > 0 && (
                      <List dense sx={{ maxHeight: 200, overflowY: "auto" }}>
                        {values.files.map((file: File, index: number) => (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText
                              primary={file.name}
                              secondary={`${(file.size / 1024).toFixed(1)} KB`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </>
                )}
              />
            </SectionPaper>

            <SectionPaper title="Follow-up">
              <FormControlLabel
                control={
                  <Switch
                    checked={values.follow_up_required}
                    onChange={(e) =>
                      setFieldValue("follow_up_required", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Follow-up Required"
              />
              {values.follow_up_required && (
                <Box mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Follow-up Date"
                      value={values.follow_up_date}
                      onChange={(date) => setFieldValue("follow_up_date", date)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          helperText: "",
                          variant: "outlined",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              )}
            </SectionPaper>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <BrandButton
                type="submit"
                variant="contained"
                disabled={!dirty || isSubmitting || isPending}
                size="large"
              >
                {isPending ? `${submitLabel}...` : submitLabel}
              </BrandButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
