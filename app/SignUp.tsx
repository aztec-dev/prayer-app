import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "./lib/supabase";
import BackButton from './ui/BackButton';

export default function SignUp() {
    // define states for user account creation.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function createAuthUser() {
        // creates a new user and returns the user id.
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) Alert.alert(error.message)
        return data.user?.id
    }

    async function createUserProfile(first_name: string, last_name: string) {
        // Creates a user profile (first name, last name)
        const userId = await createAuthUser()
        try {
            setLoading(true)
            const updates = {
                user_id: userId,
                first_name,
                last_name,
                created_at: new Date()
            }
            // console.log("New user id: ", userId)
            const { error } = await supabase.from('user_profile').upsert(updates)
            if (error) {
                Alert.alert(error.message)
            } else {
                console.log("user profile created. Now redirecting to profile page.")
                router.replace("/ProfileScreen")  // routes the user to their profile screen once signed up.
            }
            
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    return(
        <View className="flex-1 bg-primary">
            <View className="flex-1 w-[100%] items-center justify-center">
                <View className="bg-white rounded-xl p-4 w-[70%] mt-4">
                    <Text className="text-[28px]" style={{fontFamily: 'Roboto_800ExtraBold'}}>Sign Up</Text>
                    <View className="pt-1 pb-1 self-stretch">
                        <TextInput 
                            className="border border-[#ccc] rounded-lg p-3 text-[16px]"
                            placeholder="First Name"
                            onChangeText={setFirstName}
                            value={firstName}
                            placeholderTextColor="#ccc"
                            autoCapitalize="words"
                        />
                    </View>
                    <View className="pt-1 pb-1 self-stretch">
                        <TextInput 
                            className="border border-[#ccc] rounded-lg p-3 text-[16px]"
                            placeholder="Last Name"
                            onChangeText={setLastName}
                            value={lastName}
                            placeholderTextColor="#ccc"
                            autoCapitalize="words"
                        />
                    </View>
                    
                    <View className="pt-1 pb-1 self-stretch">
                        <TextInput 
                            className="border border-[#ccc] rounded-lg p-3 text-[16px]"
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            placeholderTextColor="#ccc"
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
                            placeholderTextColor="#ccc"
                            autoCapitalize="none"
                        />
                    </View>
                    
                    <View className="pt-1 pb-1 self-stretch">
                        <TouchableOpacity
                            className="bg-primary p-4 rounded-lg items-center"
                            onPress={() => createUserProfile(firstName, lastName)}
                            disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="fff"></ActivityIndicator>
                                ): (
                                    <Text className="text-white font-semibold text-[16px]">Sign Up</Text>
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