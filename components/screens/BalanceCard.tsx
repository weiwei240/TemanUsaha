import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import icons from "@/constants/icons";
import { router } from "expo-router";

const UserBalanceCard = () => {
  const handleHistory = () => router.push('/TransactionHistory')

  return (
    <View className="bg-white mx-5 p-4 rounded-2xl shadow-lg mt-[-40px]">
      <View className="flex-row items-center">
        {/* Balance Section */}
        <View className="flex-1 flex-row items-center gap-1">
          <Image source={icons.wallet2} className="w-10 h-10" />
          <View>
            <Text className="text-xs font-semibold text-green-700">
              Your Balance
            </Text>
            <View className="flex-row items-center">
              <Text className="text-base font-bold">Rp 2.500.000</Text>
              <Image
                source={icons.eye}
                className="w-4 h-4 ml-1"
                tintColor="#000"
              />
            </View>
          </View>
        </View>

        {/* Vertical Divider */}
        <View className="w-px h-full bg-gray-300 mx-2" />

        {/* Actions Section */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity className="items-center">
            <View className="bg-green-700 p-1.5 rounded-xl">
              <Image source={icons.coinInHand} className="w-8 h-8 rounded-md" />
            </View>
            <Text className="text-[9px] font-semibold text-black">
              Cash Out
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="bg-green-700 p-1.5 rounded-xl">
              <Image
                source={icons.bankBuilding}
                className="w-8 h-8 rounded-md"
              />
            </View>
            <Text className="text-[9px] font-semibold text-black">
              Transfer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={handleHistory}>
            <View className="bg-green-700 p-1.5 rounded-xl">
              <Image
                source={icons.orderHistory}
                className="w-8 h-8 rounded-md"
              />
            </View>
            <Text className="text-[9px] font-semibold text-black">History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserBalanceCard;
