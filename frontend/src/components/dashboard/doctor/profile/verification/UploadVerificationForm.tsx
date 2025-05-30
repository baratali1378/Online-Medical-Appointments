"use client";

import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { BrandButton } from "../../../common/BrandButton";

interface UploadVerificationFormProps {
  onUpload: (file: File, type: string) => Promise<void>;
}

const documentTypes = [
  "Medical License",
  "ID Card",
  "Degree",
  "Board Certification",
];

export const UploadVerificationForm = ({
  onUpload,
}: UploadVerificationFormProps) => {
  const [uploading, setUploading] = useState(false);

  const formik = useFormik({
    initialValues: { type: "", file: null as File | null },
    validationSchema: Yup.object({
      type: Yup.string().required("Required"),
      file: Yup.mixed().required("File is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!values.file) return;
      setUploading(true);
      try {
        await onUpload(values.file, values.type);
        resetForm();
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            label="Document Type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          >
            {documentTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            component="label"
            variant="outlined"
            sx={{
              textTransform: "none",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formik.values.file?.name || "Choose File"}
            <input
              type="file"
              hidden
              accept=".pdf,image/*"
              onChange={(e) =>
                formik.setFieldValue("file", e.currentTarget.files?.[0] || null)
              }
            />
          </Button>
          {formik.touched.file && formik.errors.file && (
            <Typography color="error" variant="caption">
              {formik.errors.file}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <BrandButton
            type="submit"
            variant="contained"
            disabled={uploading || !formik.isValid}
            fullWidth
          >
            {uploading ? "Uploading..." : "Upload"}
          </BrandButton>
        </Grid>
      </Grid>
    </form>
  );
};
