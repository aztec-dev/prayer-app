import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
import BackButton from "../ui/BackButton";

export default function SignIn() {
    // define states for user account creation.
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function AuthUser() {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            Alert.alert(error.message)
        } else if (data?.session) {
            router.replace('/screens/ProfileScreen');
        }
        setLoading(false)
    }

    return(
        <View className="flex-1 bg-primary">
            <View className="flex-1 w-[100%] items-center justify-center">
                <View className="bg-white rounded-xl p-4 w-[70%] mt-4">
                    <Text className="text-[28px]" style={{fontFamily: 'Roboto_800ExtraBold'}}>Login</Text>
                    
                    <View className="pt-1 pb-1 self-stretch">
                        <TextInput 
                            className="border border-[#ccc] rounded-lg p-3 text-[16px]"
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>
                    <View className="pt-1 pb-1 self-stretch">
                        <TextInput 
                            className="border border-[#ccc] rounded-lg p-3 text-[16px]"
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>
                    
                    <View className="pt-1 pb-1 self-stretch">
                        <TouchableOpacity 
                            className="bg-primary p-4 rounded-lg items-center"
                            onPress={() => AuthUser()}
                            disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff"></ActivityIndicator>
                                ): (
                                    <Text className="text-white font-semibold text-[16px]">Sign In</Text>
                                )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="w-[100%] items-start ps-5 pb-8">
                <BackButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});