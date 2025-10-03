import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

export default function Customer() {
    const [loading, setLoading] = useState(true);
    const [customers, setCustoemrs] = useState<{ first_name: string; last_name: string }[]>([]);

    useEffect(() => {
        getProfile()
    }, [])
    async function getProfile(){
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('Customer')
                .select(`first_name, last_name`)
            console.log("Supabase data: ", data)
            console.log("Supabase error: ", error)
            if (error) {
                throw error
            }

            if (data) {
                setCustoemrs(data)
            } 
        } 
        catch (error) {
                if (error instanceof Error) {
                    Alert.alert(error.message)
                }
            } 
        finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <Text>Customers</Text>
                    {loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        customers.map((customer, index) => 
                        <Text key={index}>
                            {customer.first_name} {customer.last_name}
                        </Text>
                        )
                    )}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

