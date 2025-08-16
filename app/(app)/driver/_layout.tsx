import { Stack } from "expo-router";

const DriverLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="bank" />
      <Stack.Screen name="earnings" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="rides" />
      <Stack.Screen name="vehicle" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default DriverLayout;
