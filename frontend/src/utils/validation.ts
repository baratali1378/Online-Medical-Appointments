import * as Yup from "yup";

export const patientValidationSchemas = [
  Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
    // gender is optional
  }),
  Yup.object({
    birthYear: Yup.number()
      .typeError("Year must be a number")
      .required("Birth year is required"),
    birthMonth: Yup.number()
      .typeError("Month must be a number")
      .min(1)
      .max(12)
      .required("Birth month is required"),
    birthDay: Yup.number()
      .typeError("Day must be a number")
      .min(1)
      .max(31)
      .required("Birth day is required"),
    phone: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
  }),
  Yup.object(), // Final step — no validation
];

// In @/utils/validation.ts
export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const validationSchemas = [
  Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  }),
  Yup.object({
    birthYear: Yup.number()
      .required("Year is required")
      .min(1900, "Year must be after 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future"),
    birthMonth: Yup.number()
      .required("Month is required")
      .min(1, "Month must be between 1-12")
      .max(12, "Month must be between 1-12"),
    birthDay: Yup.number()
      .required("Day is required")
      .min(1, "Day must be between 1-31")
      .max(31, "Day must be between 1-31")
      .test("valid-date", "Invalid date combination", function (value) {
        const { birthYear, birthMonth } = this.parent;
        if (!birthYear || !birthMonth || !value) return true;

        // Check for valid date
        const date = new Date(birthYear, birthMonth - 1, value);
        return (
          date.getFullYear() === birthYear &&
          date.getMonth() === birthMonth - 1 &&
          date.getDate() === value
        );
      }),
    phone_number: Yup.string().required("Phone number is required"),
    city: Yup.string().required("City is required"),
    experience: Yup.string().required("Experience is required"),
  }),
  Yup.object(),
];

export const ProfileValidation = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\+?[0-9\s-]+$/, "Invalid phone number")
    .required("Phone number is required"),
  birth: Yup.date().nullable(),
  city: Yup.string().nullable(),
  address: Yup.string().nullable(),
  postal_code: Yup.string().nullable(),
});
