import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function SignUp() {
    // define states for user account creation.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    async function createAuthUser() {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
        return data.user?.id
    }

    async function createUserProfile(first_name: string, last_name: string) {
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
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.verticallySpaced}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={setFirstName}
                    value={firstName}
                    autoCapitalize="words"
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={setLastName}
                    value={lastName}
                    autoCapitalize="words"
                />
            </View>
            
            <View style={styles.verticallySpaced}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            
            <View style={styles.verticallySpaced}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => createUserProfile(firstName, lastName)}
                    disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="fff"></ActivityIndicator>
                        ): (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    button: {
        backgroundColor: '#2e86de',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }
});