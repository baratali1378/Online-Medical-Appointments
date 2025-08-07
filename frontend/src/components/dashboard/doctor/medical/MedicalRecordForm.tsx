"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
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
  Tooltip,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormTextField } from "@/components/forms/fields/FormTextField";
import { BrandButton } from "@/components/dashboard/common/BrandButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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
  filesChanged: Yup.boolean(),
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

const formatFileSize = (size?: number) => {
  if (!size || typeof size !== "number") return "Unknown size";
  if (size > 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / 1024).toFixed(1)} KB`;
};

function FileDropzone({
  files,
  onFilesAdded,
  onFileRemove,
}: {
  files: File[];
  onFilesAdded: (files: File[]) => void;
  onFileRemove: (index: number) => void;
}) {
  const [error, setError] = React.useState<string>("");

  const onDrop = (acceptedFiles: File[], rejectedFiles: any) => {
    setError(""); // Clear previous errors

    const validatedFiles: File[] = [];

    acceptedFiles.forEach((file) => {
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        setError(`File "${file.name}" is not an accepted file type.`);
      } else if (file.size > MAX_FILE_SIZE) {
        setError(`File "${file.name}" exceeds 5MB limit.`);
      } else {
        validatedFiles.push(file);
      }
    });

    if (validatedFiles.length > 0) {
      onFilesAdded(validatedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #71C9CE",
        borderRadius: 2,
        padding: 4,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#e0f7fa" : undefined,
        transition: "background-color 0.3s",
      }}
    >
      <input {...getInputProps()} />
      <UploadFileIcon sx={{ fontSize: 48, color: "#71C9CE", mb: 1 }} />
      {isDragActive ? (
        <Typography variant="subtitle1" color="#00796b">
          Drop the files here ...
        </Typography>
      ) : (
        <Typography variant="subtitle1" color="#555">
          Drag & drop files here, or click to select files (JPG, PNG, PDF; max
          5MB each)
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <List
          dense
          sx={{
            maxHeight: 200,
            overflowY: "auto",
            mt: 3,
            bgcolor: "#f9f9f9",
            borderRadius: 1,
          }}
        >
          {files.map((file, index) => {
            const isTooLarge = file.size > MAX_FILE_SIZE;
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Tooltip title="Remove file">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileRemove(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
                sx={{
                  bgcolor: isTooLarge ? "#ffebee" : undefined,
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{ color: isTooLarge ? "error.main" : "inherit" }}
                      noWrap
                    >
                      {file.name || "Unnamed file"}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: isTooLarge ? "error.main" : "text.secondary",
                      }}
                    >
                      {formatFileSize(file.size)}
                      {isTooLarge ? " - File too large!" : ""}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}

type MedicalRecordFormProps = {
  initialValues: any;
  onSubmit: (values: any, files: File[]) => void;
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

  // Local React state for files:
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

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
        initialValues={{ ...initialValues, filesChanged: false }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, formikHelpers) => {
          onSubmit(values, files);
          formikHelpers.setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, dirty }) => {
          // Wrap file handlers to also update Formik dummy field:
          const onFilesAdded = (newFiles: File[]) => {
            handleFilesAdded(newFiles);
            setFieldValue("filesChanged", true);
          };

          const onFileRemove = (index: number) => {
            handleFileRemove(index);
            setFieldValue("filesChanged", true);
          };

          return (
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
                <FileDropzone
                  files={files}
                  onFilesAdded={onFilesAdded}
                  onFileRemove={onFileRemove}
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
                        onChange={(date) =>
                          setFieldValue("follow_up_date", date)
                        }
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
          );
        }}
      </Formik>
    </Box>
  );
}
