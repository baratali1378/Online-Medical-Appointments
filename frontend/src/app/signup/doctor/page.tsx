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
import ProtectedAuth from "@/components/common/ProtectedAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  gender: "",
};

const DoctorSignupPage = () => {
  const { mutateAsync: signupDoctor } = useDoctorSignup();
  const router = useRouter();

  const handleSubmit = async (values: DoctorSignupFormValues) => {
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
        toast.error(`Login failed: ${result.error}`, {
          position: "top-right",
        });
      } else {
        toast.success("Signup successful! Welcome aboard 🎉", {
          position: "top-right",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.message, {
        position: "top-right",
      });
    }
  };

  return (
    <ProtectedAuth>
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
          <PersonalInfoStep includeGender />
          <ContactInfoStep includeExperience />
          <FinalStep />
        </SignupStepper>
      </SignupPageLayout>
    </ProtectedAuth>
  );
};

export default DoctorSignupPage;
