import { Stack } from "expo-router";

const DriverOnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="character-reference" />
      <Stack.Screen name="congratulations" />
      <Stack.Screen name="driver-license" />
      <Stack.Screen name="id-documents" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="taxi-license" />
    </Stack>
  );
};

export default DriverOnboardingLayout;
