// constants/formFields/signupFormFields.ts
import { FormFieldConfig, genderOptions } from "@/types/formFields";

export const signupFormFields: FormFieldConfig[] = [
  {
    name: "fullname",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 8900",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: genderOptions,
  },
  {
    name: "birth",
    label: "Date of Birth",
    type: "date",
  },
];

export const loginFormFields: FormFieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];
