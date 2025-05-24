"use client";

import SignupPageLayout from "@/components/signup/SignUpPageWrapper";
import SignupStepper from "@/components/signup/SignupStepper"; // reuse the stepper you already have
import PatientPersonalInfoStep from "@/components/forms/steps/PersonalInfoStep";
import ContactInfoStep from "@/components/forms/steps/ContactInfoStep"; // reuse with some props for patient
import FinalStep from "@/components/forms/steps/FinalStep"; // generic confirmation step
import { patientValidationSchemas } from "@/utils/validation";
import ImageSide from "@/components/signup/ImageWrapper"; // image component beside signup form
import { usePatient } from "@/hooks/signup/patient/usePatient";
import { useRouter } from "next/navigation";
import { SignupFormValues } from "@/types/patient";
import { loginWithCredentials } from "@/lib/authHelper";

const patientSteps = ["Personal Info", "Contact Info", "Confirm"];

const patientInitialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  gender: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  phone: "",
  city: "",
};

const PatientSignupPage = () => {
  const { signup, loading } = usePatient();
  const router = useRouter();

  const handleSubmit = async (values: SignupFormValues, helpers: any) => {
    const formattedValues = {
      ...values,
      birth:
        values.birthYear && values.birthMonth && values.birthDay
          ? new Date(
              parseInt(values.birthYear),
              parseInt(values.birthMonth) - 1,
              parseInt(values.birthDay)
            ).toISOString()
          : null,
    };

    try {
      await signup(formattedValues);

      // Auto login after signup
      const result = await loginWithCredentials(
        values.email,
        values.password,
        "patient"
      );

      if (result?.error) {
        helpers.setStatus({ apiError: "Login failed: " + result.error });
      } else {
        router.push("/");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error.message ||
        "Signup failed";
      helpers.setStatus({ apiError: message });
    }
  };

  return (
    <SignupPageLayout
      title="Patient Signup"
      description="Create your patient profile to access personalized care."
      maxWidth="md"
    >
      <SignupStepper
        steps={patientSteps}
        initialValues={patientInitialValues}
        validationSchemas={patientValidationSchemas} // assuming validation is ready for patient
        onSubmit={handleSubmit}
        imageSide={<ImageSide src="/patient_signup.jpg" alt="Patient Signup" />}
      >
        <PatientPersonalInfoStep includeGender />
        <ContactInfoStep
          phoneField="phone"
          cityField="city"
          includeExperience={false} // patient doesn't have experience field
          birthPrefix="birth"
        />
        <FinalStep />
      </SignupStepper>
    </SignupPageLayout>
  );
};

export default PatientSignupPage;
