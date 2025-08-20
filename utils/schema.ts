import * as yup from "yup";

// Common validation helpers
const commonValidators = {
  requiredTrimmedString: (message: string) =>
    yup.string().trim().required(message),

  optionalTrimmedString: (maxLength?: number) => {
    let schema = yup.string().trim().optional().nullable();
    if (maxLength) {
      schema = schema.max(maxLength, `Cannot exceed ${maxLength} characters`);
    }
    return schema;
  },

  email: (message: string = "Invalid email format") =>
    yup.string().trim().email(message).required("Email is required"),

  password: () =>
    yup
      .string()
      .trim()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain uppercase, lowercase, number, and a special character",
      ),

  confirmPassword: (passwordRef: string = "password") =>
    yup
      .string()
      .trim()
      .oneOf([yup.ref(passwordRef)], "Passwords do not match")
      .required("Please confirm your password"),

  enumField: <T extends Record<string, string>>(
    enumObject: T,
    message: string,
    required: boolean = true,
  ) => {
    const baseSchema = yup
      .string()
      .trim()
      .transform((value) => value?.toUpperCase())
      .test("enum-validation", message, function (value) {
        if (
          !required &&
          (value === undefined || value === null || value === "")
        ) {
          return true;
        }
        return Object.values(enumObject).includes(
          value
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) as string,
        );
      });

    return required ? baseSchema.required(message) : baseSchema.optional();
  },

  positiveNumber: (fieldName: string, required: boolean = false) => {
    const schema = yup
      .number()
      .positive(`${fieldName} must be a positive number`)
      .transform((v) => (v === "" || v === null ? undefined : v))
      .typeError(`${fieldName} must be a number`)
      .nullable();

    return required
      ? schema.required(`${fieldName} is required`)
      : schema.optional();
  },

  ageField: (fieldName: string, minAge: number = 10, refField?: string) => {
    let schema = yup
      .number()
      .integer()
      .min(minAge, `Minimum ${fieldName.toLowerCase()} is ${minAge}`)
      .typeError(`${fieldName} must be a number`);

    if (refField) {
      schema = schema.min(
        yup.ref(refField),
        `${fieldName} must be greater than ${refField}`,
      );
    }

    return schema.required(`${fieldName} is required`);
  },

  dateField: (
    fieldName: string,
    required: boolean = true,
    maxDate?: Date,
    minDate?: Date,
    refField?: string,
  ) => {
    let schema = yup.date().typeError(`${fieldName} must be a valid date`);

    if (maxDate) {
      schema = schema.max(
        maxDate,
        `${fieldName} cannot be after ${maxDate.toLocaleDateString()}`,
      );
    }
    if (minDate) {
      schema = schema.min(
        minDate,
        `${fieldName} must be after ${minDate.toLocaleDateString()}`,
      );
    }

    if (refField) {
      schema = schema.min(
        yup.ref(refField),
        `${fieldName} must be after ${refField.replace(/([A-Z])/g, " $1").toLowerCase()}`,
      );
    }

    return required
      ? schema.required(`${fieldName} is required`)
      : schema.optional();
  },

  urlField: (required: boolean = false) => {
    const schema = yup.string().trim().url("Must be a valid URL").nullable();
    return required ? schema.required("URL is required") : schema.optional();
  },

  coordinates: () =>
    yup
      .string()
      .optional()
      .matches(
        /^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?((1[0-7]\d(\.\d+)?|180(\.0+)?)|([1-9]?\d(\.\d+)?))$/,
        "Must be valid lat,lng coordinates",
      )
      .nullable(),
};

export const loginSchema = yup
  .object({
    phoneNumber: commonValidators.requiredTrimmedString(
      "Phone number is required",
    ),
    password: commonValidators.password(),
  })
  .required();

export const signUpSchema = yup
  .object({
    firstName: commonValidators.requiredTrimmedString("First name is required"),
    lastName: commonValidators.requiredTrimmedString("Last name is required"),
    phoneNumber: commonValidators.requiredTrimmedString(
      "Phone number is required",
    ),
    email: commonValidators.email(),
    password: commonValidators.password(),
    confirmPassword: commonValidators.confirmPassword(),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    phoneNumber: commonValidators.requiredTrimmedString(
      "Phone number is required",
    ),
  })
  .required();

export const verifyOtpSchema = yup
  .object({
    otp: yup
      .string()
      .trim()
      .required("OTP is required")
      .length(4, "OTP must be 4 digits"),
  })
  .required();

export const resetPasswordSchema = yup
  .object({
    otp: yup
      .string()
      .trim()
      .required("OTP is required")
      .length(4, "OTP must be 4 digits"),
    newPassword: commonValidators.password(),
    confirmPassword: commonValidators.confirmPassword("newPassword"),
  })
  .required();

export const changePasswordSchema = yup
  .object({
    currentPassword: commonValidators.requiredTrimmedString(
      "Current password is required",
    ),
    newPassword: commonValidators
      .password()
      .notOneOf(
        [yup.ref("currentPassword")],
        "New password must be different from the current one",
      ),
    confirmPassword: commonValidators.confirmPassword("newPassword"),
  })
  .required();

export const updateProfileSchema = yup
  .object({
    firstName: commonValidators.optionalTrimmedString(),
    lastName: commonValidators.optionalTrimmedString(),
    phoneNumber: commonValidators.optionalTrimmedString(),
    email: commonValidators.email(),
    avatar: commonValidators.optionalTrimmedString(),
  })
  .required();
