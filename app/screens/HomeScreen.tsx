import { Button } from "@react-navigation/elements";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <Button 
        onPress={() => navigation.navigate('Profile', {name: "Azariah"})}
        > Press me
        </Button>
    )
}