import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeroSection from '../components/HeroSection'
import '../global.css'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  // const colorScheme = useColorScheme();
  // const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  // const themeButtonStyle = colorScheme === 'light' ? styles.buttonLightTheme : styles.buttonDarkTheme;

  return (
    <SafeAreaView className='flex-auto flex-col container mx-auto'>
      <View className='bg-primary h-[60px] absolute top-0 left-0 right-0 z-10'></View>
      <HeroSection />
      <View className='py-5 px-4'>
          <Text className='text-[28px]' style={{fontFamily: 'Roboto_800ExtraBold'}}>
          Bringing Christians together through prayer
        </Text>
        <Text className='text-[22px]' style={{fontFamily: 'Playfair_400Regular'}}>
          “For where two or three are gathered together in My name, 
          I am there in the midst of them.” - Matt. 18:20
        </Text>
      </View>

      {/* sign in/up buttons */}
      <View className='flex flex-row justify-center gap-6 mt-20'>
        <TouchableOpacity
          className='w-48 h-14 flex-initial bg-primary items-center justify-center rounded-xl'
          onPress={() => router.navigate('/screens/SignIn')}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className='text-white'>Sign in</Text>
          )}
        </TouchableOpacity>
          <TouchableOpacity
          className='w-48 h-14 flex-initial bg-primary items-center justify-center rounded-xl'
          onPress={() => router.navigate("/screens/SignUp")}
        >
          <Text className='text-white'>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.verticallySpaced]}>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    alignSelf: 'stretch',
  }
})
