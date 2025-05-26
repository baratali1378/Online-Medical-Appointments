// DoctorSignupPage.tsx
"use client";

import SignupPageLayout from "@/components/signup/SignUpPageWrapper";
import SignupStepper from "@/components/signup/SignupStepper";
import PersonalInfoStep from "@/components/forms/steps/PersonalInfoStep";
import ContactInfoStep from "@/components/forms/steps/ContactInfoStep";
import FinalStep from "@/components/forms/steps/FinalStep";
import { validationSchemas } from "@/utils/validation";
import ImageSide from "@/components/signup/ImageWrapper";
import { useDoctorSignup } from "@/hooks/signup/doctor/useDoctorSignup";
import { DoctorSignupFormValues } from "@/types/doctor";
import { loginWithCredentials } from "@/lib/authHelper";
import { useRouter } from "next/navigation";

const doctorInitialValues: DoctorSignupFormValues = {
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
};

const DoctorSignupPage = () => {
  const { mutateAsync: signupDoctor } = useDoctorSignup();
  const router = useRouter();

  const handleSubmit = async (
    values: DoctorSignupFormValues,
    { setStatus }: any
  ) => {
    const formattedValues: DoctorSignupFormValues = {
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
      await signupDoctor(formattedValues);

      const result = await loginWithCredentials(
        values.email,
        values.password,
        "doctor"
      );

      if (result?.error) {
        setStatus({ apiError: "Login failed: " + result.error });
      } else {
        router.push("/");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        error?.response?.data?.message ||
        error.message ||
        "Signup failed";
      setStatus({ apiError: message });
    }
  };

  return (
    <SignupPageLayout
      title="Doctor Signup"
      description="Create your profile and start your journey with us."
      maxWidth="md"
      role="doctor"
    >
      <SignupStepper
        steps={["Personal Info", "Contact Info", "Confirm"]}
        initialValues={doctorInitialValues}
        validationSchemas={validationSchemas}
        onSubmit={handleSubmit}
        imageSide={<ImageSide src="/doctor_signup.jpg" alt="Doctor Image" />}
      >
        <PersonalInfoStep />
        <ContactInfoStep includeExperience />
        <FinalStep />
      </SignupStepper>
    </SignupPageLayout>
  );
};

export default DoctorSignupPage;
