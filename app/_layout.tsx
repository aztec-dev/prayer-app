import { useColorScheme } from '@/app-example/hooks/use-color-scheme.web';
import { useFonts } from '@expo-google-fonts/inter/useFonts';
import { Playfair_400Regular } from '@expo-google-fonts/playfair/400Regular';
import { Roboto_500Medium, Roboto_800ExtraBold } from '@expo-google-fonts/roboto';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import './global.css';
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Playfair_400Regular,
    Roboto_500Medium,
    Roboto_800ExtraBold,
  });

  useEffect(()=> {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded || error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false , title: 'Landing'}} />
    </Stack>
    <StatusBar style="auto" />
  </ThemeProvider>

  );
}
