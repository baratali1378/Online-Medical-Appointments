"use client";

import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  useTheme,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { FormSubmitButton } from "@/components/forms/fields/FormSubmitButton";

interface SignupStepperProps {
  steps: string[];
  initialValues: any;
  validationSchemas: any[];
  onSubmit: (values: any, helpers: any) => Promise<void>;
  children: React.ReactNode[];
  submitButtonText?: string;
  imageSide?: React.ReactNode;
}

const SignupStepper = ({
  steps,
  initialValues,
  validationSchemas,
  onSubmit,
  children,
  submitButtonText = "Finish",
  imageSide,
}: SignupStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (values: any, helpers: any) => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      setLoading(true);
      try {
        await onSubmit(values, helpers);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      {imageSide && (
        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "flex" } }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
            }}
          >
            {imageSide}
          </Box>
        </Grid>
      )}

      <Grid item xs={12} md={imageSide ? 6 : 12}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={handleSubmit}
        >
          {({ status }) => (
            <Form>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  mb: 3,
                  "& .MuiStepLabel-label": {
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box minHeight={300}>{children[activeStep]}</Box>

              {status?.apiError && (
                <Box mt={2} color="error.main" textAlign="center">
                  {status.apiError}
                </Box>
              )}

              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ px: 4, borderRadius: 2 }}
                >
                  Back
                </Button>
                <FormSubmitButton loading={loading}>
                  {activeStep === steps.length - 1 ? submitButtonText : "Next"}
                </FormSubmitButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignupStepper;
