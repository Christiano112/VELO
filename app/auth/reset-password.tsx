import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

import AppButton from "@/components/form/AppButton";
import AppInput from "@/components/form/AppInput";
import AuthContainer from "@/components/layout/Auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomModal from "@/components/ui/CustomModal";
import { SPACING } from "@/constants/GlobalStyles";
import { useSubmit } from "@/hooks/useSubmit";
import { ResetPasswordFormData } from "@/types/form";
import { resetPasswordSchema } from "@/utils/schema";

const ResetPassword = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useSubmit<ResetPasswordFormData>(resetPasswordSchema, {
    otp: "1234",
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    setShowModal(true);
  };

  return (
    <AuthContainer>
      <ThemedText style={styles.title}>Reset Password</ThemedText>

      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <AppInput
            id="newPassword"
            placeholder="New Password"
            leftIconName="lock"
            showRightIcon
            control={control}
            errorMessage={errors.newPassword?.message}
            secureTextEntry
            autoComplete="new-password"
            keyboardType="visible-password"
          />
          <AppInput
            id="confirmPassword"
            placeholder="Confirm Password"
            leftIconName="lock"
            showRightIcon
            control={control}
            errorMessage={errors.confirmPassword?.message}
            secureTextEntry
            autoComplete="new-password"
            keyboardType="visible-password"
          />
          <AppButton
            type="form"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
          >
            Reset Password
          </AppButton>
        </ThemedView>
        <ThemedText style={styles.noAccount} type="defaultMedium">
          Don’t have an account?{" "}
          <Link href="/auth/sign-up" style={styles.signUp}>
            Sign Up
          </Link>
        </ThemedText>
      </ThemedView>

      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Password Changed!"
        text="Your password has been changed successfully."
        buttonText="Login"
        onClose={() => {
          router.replace("/auth/login");
        }}
      />
    </AuthContainer>
  );
};

export default ResetPassword;

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
