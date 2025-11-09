import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeroSection from './components/HeroSection'

export default function LandingScreen() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  
  return (
    <SafeAreaView className='flex-auto flex-col container mx-auto' edges={['bottom', 'left', 'right']}>
      <HeroSection />
      <View className='py-5 px-4 mt-4'>
          <Text className='text-[28px] dark:text-white' style={{fontFamily: 'Roboto_800ExtraBold'}}>
          Bringing Christians together through prayer
        </Text>
        <Text className='text-[22px] py-1.5 dark:text-white' style={{fontFamily: 'Playfair_400Regular'}}>
          “For where two or three are gathered together in My name, 
          I am there in the midst of them.” - Matt. 18:20
        </Text>
      </View>

      {/* sign in/up buttons */}
      <View className='flex flex-row justify-center gap-6 mt-36'>
        <TouchableOpacity
          className='w-48 h-16 flex-initial bg-primary items-center justify-center rounded-xl'
          onPress={() => router.navigate('/SignIn')}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className='text-white text-[20px]' style={{fontFamily: 'Roboto_500Medium'}}>Sign in</Text>
          )}
        </TouchableOpacity>
          <TouchableOpacity
          className='w-48 h-16 flex-initial bg-primary items-center justify-center rounded-xl'
          onPress={() => router.navigate("/SignUp")}
        >
          <Text className='text-white text-[20px]' style={{fontFamily: 'Roboto_500Medium'}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
