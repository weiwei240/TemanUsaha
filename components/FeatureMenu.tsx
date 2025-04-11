import { FEATURE_MENUS } from "@/constants/data";
import { router, Link } from "expo-router";
import React from "react";
import { View, Image, Text, ImageSourcePropType, TouchableOpacity } from "react-native";

type RoutePath = React.ComponentProps<typeof Link>['href'];

export const FeatureMenu = () => {
  return (
    <View className="flex-row justify-between px-5 py-4">
      {FEATURE_MENUS.map((menu, index) => (
        <FeatureMenuItem key={index} icon={menu.icon} label={menu.label} onPress={() => router.push(menu.route as RoutePath)}/>
      ))}
    </View>
  );
};

interface FeatureMenuItemProps {
  icon: ImageSourcePropType;
  label: string;
  onPress: () => void;
}

const FeatureMenuItem = ({ icon, label, onPress }: FeatureMenuItemProps) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <Image source={icon} className="size-16 rounded-xl mb-1" />
      <Text className="text-sm font-semibold text-center">{label}</Text>
    </TouchableOpacity>
  );
};
