import { Stack } from "expo-router";

const DriverRidesLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default DriverRidesLayout;
