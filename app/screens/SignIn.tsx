import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScreenContentWrapper } from "react-native-screens";
import { supabase } from "../lib/supabase";

export default function SignUp() {
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
            router.replace('/screens/HomeScreen') ;
        }
        setLoading(false)
    }

    return(
        <ScreenContentWrapper style={styles.container}>
        <View style={styles.splashContainer}>
            <Text style={styles.headerText}>Login</Text>
            
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
                    onPress={() => AuthUser()}
                    disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="fff"></ActivityIndicator>
                        ): (
                            <Text style={styles.buttonText}>Sign In</Text>
                        )}
                </TouchableOpacity>
            </View>
        </View>
        </ScreenContentWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#5B7E98',
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
    },
    splashContainer: {
        marginTop: 40,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: '70%',
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
        backgroundColor: '#5B7E98',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '800',
        fontFamily: 'Roboto',
    },
});