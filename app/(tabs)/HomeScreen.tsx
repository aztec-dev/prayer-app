import { useNavigation } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="mt-10">
      <Text className="text-white">Hello</Text>
    </View>
  );
}
