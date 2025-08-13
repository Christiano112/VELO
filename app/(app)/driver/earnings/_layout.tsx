import { Stack } from "expo-router";

const DriverEarningsLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="graph" />
        </Stack>
    );
};

export default DriverEarningsLayout;
