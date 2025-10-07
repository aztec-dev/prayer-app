import { useFonts } from '@expo-google-fonts/inter/useFonts'
import { Playfair_300Light } from '@expo-google-fonts/playfair/300Light'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  let fonts = useFonts({
    Playfair_300Light
  })

  return (
    <View style={[styles.container]}>
      <View style={[styles.blueHalfContainer, {alignItems: 'center'}]}>
        <Text style={{marginTop: '25%'}}>Temp logo here hehe</Text>
      </View>
      <View>

      </View>
      <View style={styles.verticallySpaced}>
        <Animated.View entering={FadeInUp.duration(500).delay(200)}>
          <Text style={[styles.bold, { fontFamily: "Roboto", fontSize: 28, textTransform: 'capitalize', marginTop: 20, }]}>
          Bringing Christians together through prayer
        </Text>
        <Text style={[styles.light, { fontFamily: "Playfair_300Light", fontSize: 22, marginTop: 10,}]}>
          “For where two or three are gathered together in My name, 
          I am there in the midst of them.” - Matt. 18:20
        </Text>
        </Animated.View>
      </View>
      <View style={[styles.flexDisplay]}>
        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={() => router.navigate('/screens/SignIn')}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign in</Text>
          )}
        </TouchableOpacity>
                <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/screens/SignUp")}
        >
          <Text style={styles.buttonText}>Go to Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.verticallySpaced]}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  blueHalfContainer: {
    backgroundColor: '#5B7E98',
    width: '100%',
    height: '45%',
    borderEndStartRadius: 25,
    borderEndEndRadius: 25,
    shadowColor: "#000",         
    shadowOpacity: 0.2,          
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  whiteHalfContainer: {
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    marginTop: 0,
    padding: 0,
  },
  verticallySpaced: {
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5B7E98',
    flex: 1,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginTop: 'auto',
    marginBottom: 40,
    shadowColor: "#000",         
    shadowOpacity: 0.2,          
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 3,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Roboto',
    fontSize: 18,
  },
  light: {
    fontWeight: '300',
  },
  bold: {
    fontWeight: '800',
  },
  flexDisplay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
})
