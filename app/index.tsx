import { Session } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScreenContentWrapper } from "react-native-screens";
import "./global.css";
import { supabase } from "./lib/supabase";
import LandingScreen from "./screens/LandingScreen";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ScreenContentWrapper>
      <LandingScreen />
    </ScreenContentWrapper>
    
  )
}
