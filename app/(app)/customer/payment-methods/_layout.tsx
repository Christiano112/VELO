import { Stack } from "expo-router";

const CustomerPaymentMethodsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add" />
    </Stack>
  );
};

export default CustomerPaymentMethodsLayout;
