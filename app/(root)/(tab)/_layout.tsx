import { Tabs } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import icons from "@/constants/icons";
import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="flex-1 mt-5 flex flex-col items-center justify-center">
    <View
      style={{
        padding: focused ? 4 : 0,
        borderRadius: 100,
        backgroundColor: focused ? "white" : "transparent",
      }}
    >
      <Image
        source={icon}
        tintColor={focused ? "green" : "white"}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </View>
    <Text
      className={`${
        focused ? "text-white font-rubik-medium" : "text-white font-rubik"
      } text-xs w-full text-center -mb-1`}
      style={{ lineHeight: 12 }}
    >
      {title}
    </Text>
  </View>
);

const AnimatedIcon = ({ focused }: { focused: boolean }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.1 : 1,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View
      style={[styles.plusCircle, { transform: [{ scale: scaleAnim }] }]}
    >
      <Ionicons
        name={focused ? "close" : "add"}
        size={focused ? 35 : 38} // slight increase for balance
        color="white"
      />
    </Animated.View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent", // so our SVG is visible
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarContainer}>
            <Svg width={width} height={80} viewBox={`0 0 ${width} 80`}>
              <Path
                d={`M0,0 H${width / 2 - 70} 
                      C${width / 2 - 40},0 ${width / 2 - 40},40 ${width / 2},40 
                      C${width / 2 + 40},40 ${width / 2 + 40},0 ${
                  width / 2 + 70
                },0 
                      H${width} V80 H0 Z`}
                fill="green"
              />
            </Svg>
          </View>
        ),

        tabBarIcon: ({ focused }) => {
          if (route.name === "Add") return null; // Hide icon, use tabBarButton
          const tabConfig: Record<
            string,
            { icon: ImageSourcePropType; title: string }
          > = {
            index: { icon: icons.home, title: "Home" },
            Inventory: { icon: icons.inventory, title: "Inventory" },
            Notification: { icon: icons.notification, title: "Notify" },
            Transaction: { icon: icons.transaction, title: "Wallet" },
          };

          const config = tabConfig[route.name];
          return config ? (
            <TabIcon
              focused={focused}
              icon={config.icon}
              title={config.title}
            />
          ) : null;
        },
        ...(route.name === "Add" && {
          tabBarButton: (props) => {
            const router = useRouter();
            const selected = props.accessibilityState?.selected || false;

            const handlePress = () => {
              if (selected) {
                // If already in Add, go to Home
                router.push("/");
              } else {
                // Navigate to Add
                props.onPress?.();
              }
            };

            return (
              <View style={styles.addWrapper}>
                <TouchableOpacity
                  onPress={handlePress}
                  activeOpacity={1}
                  style={styles.addTouchArea}
                >
                  <AnimatedIcon focused={selected} />
                </TouchableOpacity>
              </View>
            );
          },
        }),
      })}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="Inventory" options={{ headerShown: false }} />
      <Tabs.Screen name="Add" options={{ headerShown: false }} />
      <Tabs.Screen name="Notification" options={{ headerShown: false }} />
      <Tabs.Screen name="Transaction" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden", // Important to apply the radius properly
  },

  addWrapper: {
    position: "absolute",
    top: -45,
    width: width / 5,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  addTouchArea: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  plusCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
});
