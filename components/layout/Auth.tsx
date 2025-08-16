import { useRouter } from "expo-router";
import { ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";

import { COLORS } from "@/constants/Colors";
import { SPACING } from "@/constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";

interface PropType {
    children: ReactNode;
}

const AuthContainer = ({ children }: PropType) => {
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {router.canGoBack() && (
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </Pressable>
            )}
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <ThemedView style={styles.container}>
                    {children}
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AuthContainer;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.light.brand,
        paddingTop: SPACING.xLarge * 2,
    },
    backButton: {
        paddingHorizontal: 24,
        marginBottom: SPACING.xxLarge,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 485,
        width: "100%",
        marginHorizontal: "auto",
        paddingTop: SPACING.xLarge,
    },
    container: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 74,
        paddingHorizontal: 24,
        paddingBottom: SPACING.xLarge,
        paddingTop: SPACING.xmLarge,
        backgroundColor: COLORS.light.background,
    },
});
