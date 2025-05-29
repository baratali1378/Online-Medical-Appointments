"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import {
  Box,
  Button,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import { Add } from "@mui/icons-material";
import { Doctor, Phone } from "@/types/doctor";
import { BrandButton } from "../../common/BrandButton";
import { useMemo } from "react";
import { phoneNumberValidation } from "@/utils/validation";
import { PhoneNumberItem } from "./PhoneNumberItem"; // Import the new component

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

  const initialValues = useMemo(
    () => ({
      phone_numbers: phoneNumbers.length ? phoneNumbers : [{ text: "" }],
    }),
    [phoneNumbers]
  );

  return (
    <BaseCard title="Phone Numbers">
      <Formik
        initialValues={initialValues}
        validationSchema={phoneNumberValidation}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          await onUpdate({
            phone_number: values.phone_numbers,
          });
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          errors,
          touched,
          isSubmitting,
          dirty,
          isValid,
        }) => (
          <Form>
            <FieldArray name="phone_numbers">
              {({ push, remove }) => (
                <Box>
                  <Typography variant="subtitle2" mb={2} color="text.secondary">
                    Manage phone numbers below:
                  </Typography>
                  <Grid2 container>
                    {values.phone_numbers.map((number, index) => (
                      <Grid2 size={{ xs: 12 }} key={index}>
                        <PhoneNumberItem
                          index={index}
                          number={number}
                          handleChange={handleChange}
                          errors={errors}
                          touched={touched}
                          loading={loading}
                          isMobile={isMobile}
                          onRemove={() => remove(index)}
                          canRemove={values.phone_numbers.length > 1}
                        />
                      </Grid2>
                    ))}
                  </Grid2>

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
                    disabled={loading || values.phone_numbers.length >= 3}
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
              <BrandButton
                type="submit"
                loading={isSubmitting || loading}
                disabled={!dirty || !isValid || loading}
              >
                Save Changes
              </BrandButton>
            </Box>
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
