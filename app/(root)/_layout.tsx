import { useGlobalContext } from "@/context/GlobalContext";
import { Slot, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/SignIn");
    }
  }, [loading, isLoggedIn]);

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-green-500" size="large" />
      </SafeAreaView>
    );
  }

  return <Slot />;
}
