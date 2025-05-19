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
