import { Stack } from "expo-router";

const DriverVehicleLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="add" />
            <Stack.Screen name="share" />
            <Stack.Screen name="verification" />
            <Stack.Screen name="[id]" />
        </Stack>
    );
};

export default DriverVehicleLayout;
