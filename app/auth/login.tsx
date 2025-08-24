import { Link, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import { AppButton } from "@/components/form/AppButton";
import AppInput from "@/components/form/AppInput";
import AuthContainer from "@/components/layout/Auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { useSubmit } from "@/hooks/useSubmit";
import { LoginFormData } from "@/types/form";
import { loginSchema } from "@/utils/schema";

const Login = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useSubmit<LoginFormData>(loginSchema, {});

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    router.push("/(app)");
  };

  return (
    <AuthContainer>
      <ThemedText style={styles.title}>Welcome back</ThemedText>

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
          <AppInput
            id="password"
            placeholder="Enter Password"
            leftIconName="lock"
            showRightIcon
            control={control}
            errorMessage={errors.password?.message}
            secureTextEntry
            autoComplete="current-password"
            keyboardType="visible-password"
          />
          <Link href="/auth/forgot-password" style={styles.forgotPassword}>
            Forgot Password?
          </Link>
          <AppButton
            title="Login"
            onPress={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
          />
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

export default Login;

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
  forgotPassword: {
    color: COLORS.light.placeholderColor,
    alignSelf: "flex-end",
    marginBottom: SPACING.xxLarge,
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
