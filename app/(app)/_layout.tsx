import { Stack } from "expo-router";

const AppLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="customer" />
            <Stack.Screen name="driver" />
            <Stack.Screen name="messaging" />
        </Stack>
    );
};

export default AppLayout;
