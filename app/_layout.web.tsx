import "expo-dev-client";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { Provider } from "@/components/layout/Provider";
import { CustomSplashScreen } from "@/components/layout/Splash";
import { useColorScheme } from "@/hooks/useColorScheme";

const isLoggedIn = true;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.hideAsync();

        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn("Error during app preparation:", e);
      } finally {
        setShowCustomSplash(false);
        setTimeout(() => {
          setShowCustomSplash(false);
        }, 500);
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 1000);
      }
    }

    prepare();
  }, []);

  if (!loaded || showCustomSplash) {
    return <CustomSplashScreen />;
  }

  return (
    <Provider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(app)" />
            <Stack.Screen name="legal" />
          </Stack.Protected>
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="auth" />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
