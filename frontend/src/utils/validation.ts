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

export const doctorPersonalInfoValidation = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  biography: Yup.string(),
  experience: Yup.string().required("Experience is required"),
});

export const timeSlotsValidationSchema = Yup.object({
  available_slots: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.string().required("Day is required"),

        start_time: Yup.string().required("Start time is required"),

        end_time: Yup.string()
          .required("End time is required")
          .test(
            "is-after-start",
            "End time must be after start time",
            function (end_time) {
              const { start_time } = this.parent;
              return !!end_time && !!start_time && end_time > start_time;
            }
          ),

        capacity: Yup.number()
          .typeError("Capacity must be a number")
          .integer("Capacity must be an integer")
          .min(1, "Capacity must be at least 1")
          .required("Capacity is required"),

        is_active: Yup.boolean()
          .required("Status is required")
          .oneOf([true, false], "Invalid status"),
      })
    )
    .min(1, "At least one time slot is required"),
});

const phoneRegex = /^\+?[1-9]\d{1,3}[-.\s]?(\d{1,4}[-.\s]?){1,4}\d{1,4}$/;

export const phoneNumberValidation = Yup.object().shape({
  phone_numbers: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string()
          .matches(phoneRegex, "Invalid phone number format")
          .required("Phone number is required"),
      })
    )
    .min(1, "At least one phone number is required")
    .max(3, "You can only have up to 3 phone numbers")
    .test("unique", "Phone numbers must be unique", (value) => {
      const texts = value?.map((v) => v.text.trim());
      return new Set(texts).size === texts?.length;
    }),
});
