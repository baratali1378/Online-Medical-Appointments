import * as Yup from "yup";
import validationMessages from "@/config/login.json";
import { useState } from "react";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormResult {
  success: boolean;
  message?: string;
}

const useLoginForm = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(validationMessages.email.invalid)
      .required(validationMessages.email.required),
    password: Yup.string().required(validationMessages.password.required),
  });

  const handleSubmit = async (
    values: LoginFormValues
  ): Promise<LoginFormResult> => {
    try {
      // Simulate an API call (replace with actual API call)
      console.log("Login Submitted:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

      // Return success result
      return { success: true, message: "Login successful!" };
    } catch (error) {
      // Return error result
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    showPassword,
    setShowPassword,
  };
};

export default useLoginForm;
