import { Stack } from "expo-router";


const isCustomer = true;

const AppLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="index"
        >
            <Stack.Protected guard={true}>
                <Stack.Screen name="index" />

                <Stack.Protected guard={isCustomer}>
                    <Stack.Screen name="customer" />
                </Stack.Protected>

                <Stack.Protected guard={!isCustomer}>
                    <Stack.Screen name="driver" />
                </Stack.Protected>

                <Stack.Screen name="messaging" />
            </Stack.Protected>
        </Stack>
    );
};

export default AppLayout;
