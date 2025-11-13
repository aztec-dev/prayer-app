import { useColorScheme } from "@/app-example/hooks/use-color-scheme.web";
import { useFonts } from "@expo-google-fonts/inter/useFonts";
import { Playfair_400Regular } from "@expo-google-fonts/playfair/400Regular";
import {
  Roboto_500Medium,
  Roboto_800ExtraBold,
} from "@expo-google-fonts/roboto";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";
import { supabase } from "./lib/supabase";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Playfair_400Regular,
    Roboto_500Medium,
    Roboto_800ExtraBold,
  });
  const [isReady, setIsReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    let mounted = true;
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setIsAuthed(!!session);
      supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setIsAuthed(!!session);
      });
      setIsReady(true);
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  if (!loaded || error || !isReady || isAuthed === null) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {isAuthed ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="index" />
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
