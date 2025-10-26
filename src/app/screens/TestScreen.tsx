import { Text } from "react-native";
import "../global.css";
export default function TestScreen() {
    return (
        <Text className="text-root">
            <Text className="text-[--font-size-dynamic]">I scale with screen width</Text>
        </Text>
    )
}