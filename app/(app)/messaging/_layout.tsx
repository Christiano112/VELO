import { Stack } from "expo-router";

const MessagingLayout = () => {
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

export default MessagingLayout;
