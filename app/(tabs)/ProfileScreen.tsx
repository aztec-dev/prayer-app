import { Button, Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function ProfileScreen() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null)
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) {
            Alert.alert(error.message)
        } else {
            router.replace("/")
        }
    }
    // Get the user's profile details from the supabase database. The table should be
    // called user_profile.
    // psuedo code:
    // Function get UserProfile
    //  CONST VAR await supabase user
    //  CONST VAR await data and check error
    //  IF data then return
    //      FIRST NAME AND LAST NAME 
    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const { data, error } = await supabase
                .from('user_profile')
                .select('first_name, last_name')
                .eq('user_id', user?.id)
                .single()
            if (error) {
                Alert.alert(error.message);
            } else {
                console.log(user);
                console.log(data);
                setProfile(data);
            }
        }
        getProfile();
    }, [])
    return(
        <SafeAreaView>
            <Text>Hello {profile?.first_name} {profile?.last_name}</Text>
            <Button onPressIn={() => signOut()}>
                Sign out
            </Button>
        </SafeAreaView>
    )
}