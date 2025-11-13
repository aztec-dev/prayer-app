import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-slate-400 rounded-[50%]"
      onPress={() => router.replace("../")}
    >
      <Ionicons name="arrow-back-circle" size={38} color="white" />
    </TouchableOpacity>
  );
}
