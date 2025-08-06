"use client";

import { BaseCard } from "@/components/dashboard/common/Card";
import { Grid, Button, Box } from "@mui/material";
import { Formik, Form } from "formik";
import { doctorPersonalInfoValidation } from "@/utils/validation";
import { Doctor } from "@/types/doctor";
import {
  FormTextField,
  FormGridSelectField,
} from "@/components/dashboard/common/FormFields";
import { useCitiesQuery } from "@/hooks/useCitiesQuery";
import { BrandButton } from "../../common/BrandButton";
import { useState } from "react";
import ChangePasswordDialog from "@/components/dashboard/common/ChangepasswordDialog"; // same as in patient card

interface PersonalInfoCardProps {
  doctor: Doctor;
  onUpdate: (data: Partial<Doctor>) => Promise<void>;
  onRefresh: () => Promise<void>;
  loading: boolean;
  token: string; // added so we can pass token to dialog
}

const experienceYears = Array.from({ length: 50 }, (_, i) => ({
  label: `${i + 1} year${i > 0 ? "s" : ""}`,
  value: (i + 1).toString(),
}));

export const PersonalInfoCard = ({
  doctor,
  onUpdate,
  onRefresh,
  loading,
  token,
}: PersonalInfoCardProps) => {
  const { data: cities = [], isLoading: citiesLoading } = useCitiesQuery();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const extractYears = (expStr: string) => {
    const match = expStr.match(/\d+/);
    return match ? match[0] : "";
  };

  const cityOptions =
    cities?.map((city) => ({
      label: city.name,
      value: city.name,
    })) || [];

  const initialValues = {
    name: doctor.personal_info.fullname || "",
    email: doctor.personal_info.email || "",
    city: doctor.city?.name || "",
    biography: doctor.biography || "",
    experience: doctor.experience ? extractYears(doctor.experience) : "",
  };

  return (
    <BaseCard title="Personal Information">
      <Formik
        initialValues={initialValues}
        validationSchema={doctorPersonalInfoValidation}
        onSubmit={async (values) => {
          await onUpdate({
            personal_info: {
              ...doctor.personal_info,
              fullname: values.name,
              email: values.email,
            },
            city: cities.find((city) => city.name === values.city),
            biography: values.biography,
            experience: values.experience,
          });
        }}
      >
        {({ isSubmitting, dirty }) => (
          <Form>
            <Grid container spacing={2}>
              <FormTextField name="name" label="Full Name" multiline />
              <FormTextField name="email" label="Email" multiline />

              <FormGridSelectField
                name="city"
                label="City"
                options={citiesLoading ? [] : cityOptions}
              />

              <FormGridSelectField
                name="experience"
                label="Experience"
                options={experienceYears}
              />

              <FormTextField
                name="biography"
                label="Biography"
                multiline
                maxRows={20}
                fullWidthGrid
              />
            </Grid>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                onClick={onRefresh}
                disabled={isSubmitting || loading}
              >
                Cancel
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setPasswordDialogOpen(true)}
              >
                Change Password
              </Button>

              <BrandButton
                type="submit"
                loading={isSubmitting || loading}
                disabled={!dirty || isSubmitting || loading}
              >
                Save Changes
              </BrandButton>
            </Box>

            <ChangePasswordDialog
              open={passwordDialogOpen}
              onClose={() => setPasswordDialogOpen(false)}
              role="doctor"
              token={token}
            />
          </Form>
        )}
      </Formik>
    </BaseCard>
  );
};
