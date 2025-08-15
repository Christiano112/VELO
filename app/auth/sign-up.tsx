import { useState } from "react";
import { StyleSheet } from "react-native";

import AppButton from "@/components/form/AppButton";
import AppCheckBox from "@/components/form/AppCheckBox";
import AppInput from "@/components/form/AppInput";
import AuthContainer from "@/components/layout/Auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { useSubmit } from "@/hooks/useSubmit";
import { SignupFormData } from "@/types/form";
import { signUpSchema } from "@/utils/schema";
import { Link } from "expo-router";

const SignUp = () => {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useSubmit<SignupFormData>(signUpSchema, {});

    const onSubmit = (data: SignupFormData) => {
        console.log(data)
    }

    return (
        <AuthContainer>
            <ThemedText style={styles.title}>Sign Up</ThemedText>

            <ThemedView style={styles.container}>
                <ThemedView style={styles.names}>
                    <AppInput
                        id="firstName"
                        placeholder="First Name"
                        control={control}
                        errorMessage={errors.firstName?.message}
                        autoComplete="given-name"
                        containerStyle={{ width: "55%" }}
                    />
                    <AppInput
                        id="lastName"
                        placeholder="Last Name"
                        control={control}
                        errorMessage={errors.lastName?.message}
                        autoComplete="off"
                        importantForAutofill="no"
                        containerStyle={{ width: "55%" }}
                    />
                </ThemedView>
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
                    id="email"
                    placeholder="Email"
                    control={control}
                    errorMessage={errors.email?.message}
                    autoComplete="email"
                    type="email"
                    leftIconName="email"
                />
                <AppInput
                    id="password"
                    placeholder="New Password"
                    leftIconName="lock"
                    showRightIcon
                    control={control}
                    errorMessage={errors.password?.message}
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
                    Create Account
                </AppButton>
                <ThemedView style={styles.terms}>
                    <AppCheckBox checked={agreedToTerms} onValueChange={(checked) => setAgreedToTerms(checked)} />
                    <ThemedText style={styles.check}>I have agreed with <Link href="/legal/terms-conditions" style={styles.link}>Terms & Conditions.</Link></ThemedText>
                </ThemedView>
                <ThemedText style={styles.alreadyHaveAnAccount} type="defaultMedium">Already have an account? <Link href="/auth/forgot-password" style={styles.login}>Login</Link></ThemedText>
            </ThemedView>
        </AuthContainer>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: "500",
        fontFamily: "Roboto-Medium",
        color: "#757575",
        textAlign: "left"
    },
    container: {
        flex: 1,
        width: "100%",
        gap: SPACING.normal,
        marginHorizontal: "auto",
        marginTop: SPACING.xLarge,
    },
    names: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: SPACING.medium,
        marginHorizontal: "auto",
        width: "88%",
    },
    terms: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: SPACING.medium,
    },
    check: {
        color: COLORS.light.placeholderColor,
    },
    link: {
        color: "#9C27B0",
    },
    alreadyHaveAnAccount: {
        textAlign: "center",
        marginTop: SPACING.xmLarge,
        letterSpacing: 0.2,
        lineHeight: 21,
    },
    login: {
        fontWeight: "700",
        color: "#6e00cc"
    },
})
