import { Link, useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";

import AppButton from "@/components/form/AppButton";
import AuthContainer from "@/components/layout/Auth";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { useSubmit } from "@/hooks/useSubmit";
import { VerifyOtpFormData } from "@/types/form";
import { verifyOtpSchema } from "@/utils/schema";
import { Controller } from "react-hook-form";

const Verification = () => {
    const router = useRouter();
    const OTPRef = useRef<OtpInputRef>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useSubmit<VerifyOtpFormData>(verifyOtpSchema, {});

    const onSubmit = (data: VerifyOtpFormData) => {
        console.log(data);
        router.replace("/auth/reset-password");
    }

    return (
        <AuthContainer>
            <ThemedText style={styles.title}>OTP Verification</ThemedText>

            <ThemedView style={styles.container}>
                <ThemedView style={styles.content}>
                    <Controller
                        control={control}
                        rules={{
                            required: "Verification code is required",
                        }}
                        name="otp"
                        render={({ field: { onChange, onBlur } }) => (
                            <OtpInput
                                ref={OTPRef}
                                numberOfDigits={4}
                                focusColor={COLORS.light.brand}
                                focusStickBlinkingDuration={500}
                                onTextChange={(text) => {
                                    onChange(text);
                                }}
                                type="numeric"
                                theme={{
                                    containerStyle: styles.otpContainer,
                                    pinCodeTextStyle: styles.otpInputText,
                                    pinCodeContainerStyle: styles.otpInput,
                                }}
                                textInputProps={{
                                    onBlur,
                                    keyboardType: "numeric",
                                    caretHidden: true,
                                    cursorColor: COLORS.light.brand,
                                }}
                            />
                        )}
                    />
                    {errors?.otp && (
                        <ThemedText type="errorMessage" style={styles.error}>
                            {errors?.otp?.message}
                        </ThemedText>
                    )}
                    <AppButton
                        type="form"
                        onPress={handleSubmit(onSubmit)}
                        isDisabled={!isDirty}
                    >
                        Verify
                    </AppButton>
                </ThemedView>
                <ThemedText style={styles.noAccount} type="defaultMedium">Don’t have an account? <Link href="/auth/sign-up" style={styles.signUp}>Sign Up</Link></ThemedText>
            </ThemedView>
        </AuthContainer>
    )
}

export default Verification;

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
        marginHorizontal: "auto",
        marginVertical: SPACING.xLarge,
    },
    content: {
        flex: 1,
        gap: SPACING.normal,
    },
    otpContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: SPACING.mSmall,
        marginBottom: SPACING.large,
    },
    otpInput: {
        borderRadius: SPACING.mSmall,
        borderColor: "#9C27B01A",
        borderWidth: 1.2,
        backgroundColor: COLORS.light.white,
        width: 56,
        height: 60,
        alignContent: "center",
        justifyContent: "center",
    },
    otpInputText: {
        color: COLORS.light.black,
        fontSize: 20,
        textAlign: "center",
    },
    error: {
        textAlign: "center",
        marginBottom: SPACING.xLarge,
    },
    noAccount: {
        textAlign: "center",
        marginTop: SPACING.xmLarge,
        letterSpacing: 0.2,
        lineHeight: 21,
    },
    signUp: {
        fontWeight: "700",
        color: "#6e00cc"
    },
})
