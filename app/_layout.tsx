import { SplashScreen, Stack } from "expo-router";
import "./globals.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { OrderProvider, useOrder } from "@/context/OrderContext";
import { orderPages } from "@/constants/data";
import { useAutoResetOnExit } from "@/hooks/useAutoResetOnExit";
import { useOrderFlow } from "@/hooks/useOrderFlow";
import GlobalProvider from "@/context/GlobalContext";

function InnerLayout() {
  const { orderInProgress, resetOrder } = useOrder();

  useOrderFlow(orderPages);

  useAutoResetOnExit(orderPages, () => {
    if (orderInProgress) resetOrder();
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <StatusBar
        translucent
        backgroundColor="green"
        barStyle="light-content" // use 'dark-content' for light backgrounds
      />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  )
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <OrderProvider>
        <InnerLayout />
      </OrderProvider>
    </GlobalProvider>
  );
}
