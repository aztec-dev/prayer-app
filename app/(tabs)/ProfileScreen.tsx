import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/");
    }
  }

  function goToSettings() {
    return router.push("/(tabs)/SettingsScreen");
  }
  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("user_profile")
        .select("first_name, last_name")
        .eq("user_id", user?.id)
        .single();
      if (error) {
        Alert.alert(error.message);
      } else {
        // console.log(user);
        // console.log(data);
        setProfile(data);
      }
    };
    getProfile();
  }, []);
  return (
    <SafeAreaView className="flex-auto flex-col container mx-auto">
      <View>
        <View className="py-5 px-4 mt-4 flex-row-reverse">
          <TouchableOpacity className="" onPress={goToSettings}>
            <FontAwesome name="cog" size={40} color="grey" />
          </TouchableOpacity>
        </View>

        <Text>
          Hello {profile?.first_name} {profile?.last_name}
        </Text>
        <Button onPressIn={() => signOut()}>Sign out</Button>
      </View>
    </SafeAreaView>
  );
}
