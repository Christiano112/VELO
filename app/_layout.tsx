import "expo-dev-client";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Provider } from "@/components/layout/Provider";
import { CustomSplashScreen } from "@/components/layout/Splash";
import { COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const isLoggedIn = true;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
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
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || showCustomSplash) {
    return <CustomSplashScreen />;
  }

  return (
    <Provider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView
          onLayout={onLayoutRootView}
          style={{
            flex: 1,
            // paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            backgroundColor: COLORS.light.brand,
          }}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(app)" />
              <Stack.Screen name="legal" />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="auth" />
            </Stack.Protected>
          </Stack>
          <StatusBar style="dark" />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
