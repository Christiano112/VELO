import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import AppButton from "@/components/form/AppButton";
import AppInput from "@/components/form/AppInput";
import AuthContainer from "@/components/layout/Auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SPACING } from "@/constants/GlobalStyles";
import { useSubmit } from "@/hooks/useSubmit";
import { ForgotPasswordFormData } from "@/types/form";
import { forgotPasswordSchema } from "@/utils/schema";

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useSubmit<ForgotPasswordFormData>(forgotPasswordSchema, {});

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
  };

  return (
    <AuthContainer>
      <ThemedText style={styles.title}>Forgot Password?</ThemedText>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <AppInput
            id="phoneNumber"
            placeholder="Phone Number"
            control={control}
            errorMessage={errors.phoneNumber?.message}
            autoComplete="tel"
            type="tel"
            leftIconName="phone"
          />
          <AppButton
            type="form"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
          >
            Send Code
          </AppButton>
        </ThemedView>
        <ThemedText style={styles.noAccount} type="defaultMedium">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" style={styles.signUp}>
            Sign Up
          </Link>
        </ThemedText>
      </ThemedView>
    </AuthContainer>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "500",
    fontFamily: "Roboto-Medium",
    color: "#757575",
    textAlign: "left",
  },
  container: {
    flex: 1,
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: SPACING.xLarge,
  },
  content: {
    flex: 1,
    gap: SPACING.normal,
  },
  noAccount: {
    textAlign: "center",
    marginTop: SPACING.xmLarge,
    letterSpacing: 0.2,
    lineHeight: 21,
  },
  signUp: {
    fontWeight: "700",
    color: "#6e00cc",
    textDecorationLine: "underline",
  },
});
