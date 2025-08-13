import { Stack } from "expo-router";

const CustomerRidesLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="reservation-confirmation" />
            <Stack.Screen name="schedule" />
            <Stack.Screen name="upcoming" />
            <Stack.Screen name="[id]" />
        </Stack>
    );
};

export default CustomerRidesLayout;
