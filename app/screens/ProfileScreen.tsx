import { Button, Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function ProfileScreen() {
    const router = useRouter();
    return(
        <View>
            <Text>This is the profile page</Text>
            <Button onPressIn={() => router.navigate("/")}>
                Go to Home
            </Button>
        </View>
    )
}