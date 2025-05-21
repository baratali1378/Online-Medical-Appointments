import * as Yup from "yup";

export const validation = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: Yup.string()
    .matches(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/,
      "Phone number is not valid"
    )
    .required("Phone number is required"),

  birth: Yup.string().required("Date of birth is required"),

  gender: Yup.string().required("Gender is required"),
});

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
