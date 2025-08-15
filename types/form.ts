import * as yup from "yup";
import {
    changePasswordSchema,
    forgotPasswordSchema,
    loginSchema,
    resetPasswordSchema,
    signUpSchema,
    verifyOtpSchema,
} from "../utils/schema";

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signUpSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
export type VerifyOtpFormData = yup.InferType<typeof verifyOtpSchema>;
export type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
