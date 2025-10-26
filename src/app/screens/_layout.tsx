import { Stack } from 'expo-router'

export default function ScreensLayout() {
    return <Stack>
        <Stack.Screen name='HomeScreen' options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='ProfileScreen' options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='SignIn' options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='SignUp' options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name='LandingScreen' options={{headerShown: false}}></Stack.Screen>
    </Stack>
}