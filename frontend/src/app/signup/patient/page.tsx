"use client";

import SignupPageLayout from "@/components/signup/SignUpPageWrapper";
import SignupStepper from "@/components/signup/SignupStepper";
import PatientPersonalInfoStep from "@/components/forms/steps/PersonalInfoStep";
import ContactInfoStep from "@/components/forms/steps/ContactInfoStep";
import FinalStep from "@/components/forms/steps/FinalStep";
import { patientValidationSchemas } from "@/utils/validation";
import ImageSide from "@/components/signup/ImageWrapper";
import { usePatient } from "@/hooks/signup/patient/usePatient";
import { useRouter } from "next/navigation";
import { SignupFormValues } from "@/types/patient";
import { loginWithCredentials } from "@/lib/authHelper";
import ProtectedAuth from "@/components/common/ProtectedAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { signup } = usePatient();
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
        toast.error(`Login failed: ${result.error}`, {
          position: "top-right",
        });
      } else {
        toast.success("Signup successful! Welcome to your care journey 🎉", {
          position: "top-right",
        });
        router.push("/");
      }
    } catch (error: any) {
      const message = error.message || "Signup failed";

      toast.error(message, {
        position: "top-right",
      });

      helpers.setStatus({ apiError: message });
    }
  };

  return (
    <ProtectedAuth>
      <SignupPageLayout
        title="Patient Signup"
        description="Create your patient profile to access personalized care."
        maxWidth="md"
        role="patient"
      >
        <SignupStepper
          steps={["Personal Info", "Contact Info", "Confirm"]}
          initialValues={patientInitialValues}
          validationSchemas={patientValidationSchemas}
          onSubmit={handleSubmit}
          imageSide={
            <ImageSide src="/patient_signup.jpg" alt="Patient Signup" />
          }
        >
          <PatientPersonalInfoStep includeGender />
          <ContactInfoStep
            phoneField="phone"
            cityField="city"
            includeExperience={false}
            birthPrefix="birth"
          />
          <FinalStep />
        </SignupStepper>
      </SignupPageLayout>
    </ProtectedAuth>
  );
};

export default PatientSignupPage;
