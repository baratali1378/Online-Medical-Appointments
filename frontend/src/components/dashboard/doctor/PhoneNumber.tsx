"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  CircularProgress,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import { Delete, Add, Save } from "@mui/icons-material";
import { Doctor, Phone } from "@/types/doctor";
import { phoneNumberValidation } from "@/utils/validation";
import { useState } from "react";
import { BrandButton } from "../common/BrandButton";

interface PhoneNumbersCardProps {
  phoneNumbers: Phone[];
  doctor: Doctor;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  loading: boolean;
}

export const PhoneNumbersCard = ({
  phoneNumbers,
  onUpdate,
  loading,
}: PhoneNumbersCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialValues = {
    phone_numbers: phoneNumbers.length ? phoneNumbers : [{ text: "" }],
  };

  return (
    <BaseCard title="Phone Numbers">
      <Formik
        initialValues={initialValues}
        validationSchema={phoneNumberValidation}
        onSubmit={async (values, { setSubmitting }) => {
          await onUpdate({
            phone_number: values.phone_numbers,
          });
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form>
            <FieldArray name="phone_numbers">
              {({ push, remove }) => (
                <Box>
                  <Typography variant="subtitle2" mb={2} color="text.secondary">
                    Manage phone numbers below:
                  </Typography>
                  <Grid container spacing={2}>
                    {values.phone_numbers.map((number, index) => {
                      const hasError =
                        touched.phone_numbers &&
                        touched.phone_numbers[index] &&
                        errors.phone_numbers &&
                        (errors.phone_numbers[index] as any)?.text;

                      return (
                        <Grid
                          item
                          xs={12}
                          key={index}
                          container
                          spacing={1}
                          alignItems="flex-start"
                        >
                          <Grid item xs={isMobile ? 10 : 11}>
                            <TextField
                              fullWidth
                              size="small"
                              label={`Phone Number ${index + 1}`}
                              name={`phone_numbers[${index}].text`}
                              value={number.text}
                              onChange={handleChange}
                              error={!!hasError}
                              helperText={hasError}
                              disabled={loading}
                              placeholder="+93 772228192"
                            />
                          </Grid>
                          <Grid item xs={isMobile ? 2 : 1}>
                            <Tooltip title="Remove">
                              <span>
                                <IconButton
                                  onClick={() => remove(index)}
                                  color="error"
                                  disabled={values.phone_numbers.length <= 1}
                                  size="small"
                                >
                                  <Delete />
                                </IconButton>
                              </span>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>

                  <Button
                    variant="outlined"
                    onClick={() => push({ text: "" })}
                    sx={{
                      mt: 2,
                      width: isMobile ? "100%" : "auto",
                      color: "#71C9CE",
                      borderColor: "#71C9CE",
                      "&:hover": {
                        backgroundColor: "#E3F9FB",
                        borderColor: "#71C9CE",
                      },
                    }}
                    disabled={loading}
                    startIcon={<Add />}
                    size={isMobile ? "small" : "medium"}
                  >
                    Add Phone Number
                  </Button>
                </Box>
              )}
            </FieldArray>

            <Box
              mt={4}
              display="flex"
              justifyContent="flex-end"
              gap={2}
              flexWrap="wrap"
            >
              <BrandButton type="submit" loading={isSubmitting || loading}>
                Save Changes
              </BrandButton>
            </Box>
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
