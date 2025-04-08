import { FEATURE_MENUS } from "@/constants/data";
import React from "react";
import { View, Image, Text, ImageSourcePropType } from "react-native";

export const FeatureMenu = () => {
  return (
    <View className="flex-row justify-between px-5 py-4">
      {FEATURE_MENUS.map((menu, index) => (
        <FeatureMenuItem key={index} icon={menu.icon} label={menu.label} />
      ))}
    </View>
  );
};

interface FeatureMenuItemProps {
  icon: ImageSourcePropType;
  label: string;
}

const FeatureMenuItem = ({ icon, label }: FeatureMenuItemProps) => {
  return (
    <View className="items-center">
      <Image source={icon} className="size-16 rounded-xl mb-1" />
      <Text className="text-sm font-semibold text-center">{label}</Text>
    </View>
  );
};
