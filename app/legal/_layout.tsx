import { Stack } from "expo-router";

const LegalLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="help"
        >
            <Stack.Screen name="help" />
            <Stack.Screen name="privacy-policy" />
            <Stack.Screen name="terms-conditions" />
        </Stack>
    );
};

export default LegalLayout;
