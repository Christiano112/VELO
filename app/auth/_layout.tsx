import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="sign-up"
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="reset-password" />
            <Stack.Screen name="verification" />
        </Stack>
    );
};

export default AuthLayout;
