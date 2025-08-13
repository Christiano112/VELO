import { Stack } from "expo-router";

const CustomerLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="payment-methods" />
            <Stack.Screen name="rides" />
            <Stack.Screen name="contacts" />
            <Stack.Screen name="menu" />
            <Stack.Screen name="menu" />
            <Stack.Screen name="notification" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="rate-driver" />
        </Stack>
    );
};

export default CustomerLayout;
