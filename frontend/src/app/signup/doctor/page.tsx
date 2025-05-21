"use client";

import SignupPageLayout from "@/components/signup/SignUpPageWrapper";
import SignupStepper from "@/components/signup/doctor/SignupStepper";
import PersonalInfoStep from "@/components/forms/steps/PersonalInfoStep";
import ContactInfoStep from "@/components/forms/steps/ContactInfoStep";
import FinalStep from "@/components/forms/steps/FinalStep";
import { validationSchemas } from "@/utils/validation";

const doctorSteps = ["Personal Info", "Contact Info", "Confirm"];

const doctorInitialValues = {
  name: "",
  email: "",
  password: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  experience: "",
  biography: "",
  phone_number: "",
  city: "",
  specialties: [],
};

const DoctorSignupPage = () => {
  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      birth:
        values.birthYear && values.birthMonth && values.birthDay
          ? new Date(
              values.birthYear,
              values.birthMonth - 1,
              values.birthDay
            ).toISOString()
          : null,
    };

    alert(JSON.stringify(formattedValues, null, 2));
  };

  return (
    <SignupPageLayout
      title="Doctor Signup"
      description="Create your profile and start your journey with us."
    >
      <SignupStepper
        steps={doctorSteps}
        initialValues={doctorInitialValues}
        validationSchemas={validationSchemas}
        onSubmit={handleSubmit}
      >
        <PersonalInfoStep />
        <ContactInfoStep includeExperience />
        <FinalStep />
      </SignupStepper>
    </SignupPageLayout>
  );
};

export default DoctorSignupPage;
