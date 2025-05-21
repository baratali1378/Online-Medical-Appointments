"use client";

import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { Formik, Form } from "formik";
import { useState } from "react";
import { FormSubmitButton } from "@/components/forms/fields/FormSubmitButton";

interface SignupStepperProps {
  steps: string[];
  initialValues: any;
  validationSchemas: any[];
  onSubmit: (values: any) => Promise<void>;
  children: React.ReactNode[]; // Each step
  submitButtonText?: string;
}

const SignupStepper = ({
  steps,
  initialValues,
  validationSchemas,
  onSubmit,
  children,
  submitButtonText = "Finish",
}: SignupStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async (values: any) => {
    if (activeStep < steps.length - 1) {
      handleNext();
    } else {
      setLoading(true);
      try {
        await onSubmit(values);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[activeStep]}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 4,
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
  );
};

export default SignupStepper;
