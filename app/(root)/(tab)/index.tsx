import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "@/constants/images";
import UserBalanceCard from "@/components/screens/BalanceCard";
import { FeatureMenu } from "@/components/screens/FeatureMenu";
import FinancialReportCard from "@/components/shared/FinancialReportCard";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { paymentData, dummyArticles } from "@/data/dummy"
import { useGlobalContext } from "@/context/GlobalContext";

export default function Home() {
  const insets = useSafeAreaInsets();
  const handleSettings = () => router.push('/Settings')

  const {business, loading} = useGlobalContext()
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
    >
      {/* Header */}
      <View className="bg-white rounded-b-2xl">
        <View className="bg-green-700 px-5 pb-16 p-6 rounded-b-3xl flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Image
              source={business?.avatar ? {uri: business.avatar} : images.avatar}
              className="size-16 rounded-full border-2 border-white"
            />
            <View>
              {loading ? (
                <Text className="text-white text-xl font-rubik-bold">Loading...</Text>
              ) : business ? (
                <Text className="text-white text-xl font-rubik-bold">{business.name}</Text>
              ) : (
                <Text className="text-white text-xl font-rubik-bold">Business not found</Text>
              )}
              <TouchableOpacity onPress={handleSettings}>
                <Text className="text-white text-sm font-rubik">
                  Edit Profile ✏️
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row gap-3">
            <Image source={icons.share} className="size-6" />
            <TouchableOpacity onPress={handleSettings}>
              <Image source={icons.settings} className="size-6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance */}
        <UserBalanceCard />
      </View>

      {/* Feature Menu */}
      <FeatureMenu />

      {/* Financial Report */}
      <View className="bg-white mx-4 rounded-2xl p-4 shadow-2xl">
        {/* <TouchableOpacity onPress={() => router.push('/SignIn')}>
          <Text>Login Screen</Text>
        </TouchableOpacity> */}
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-lg font-semibold">Financial Report</Text>
            <Text className="text-xs text-gray-500 mt-[-2px]">
              Better financial reports unlock new opportunities.
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/FinancialReport')}>
            <Text className="text-sm text-blue-500 font-medium">View</Text>
          </TouchableOpacity>
        </View>
        <FinancialReportCard title="Payment Methods" data={paymentData}/>
      </View>

      {/* Articles */}
      <View className="px-5 mt-5">
        <Text className="text-lg font-bold">
          Expand Your Business Knowledge!
        </Text>
        <Text className="text-sm text-gray-500">
          Get insights about business
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3"
        >
          {dummyArticles.map((item, index) => (
            <View key={index} className="mr-4 w-56">
              <Image
                source={{ uri: item.img }}
                className="w-full h-28 rounded-xl mb-2"
                resizeMode="cover"
              />
              <Text className="text-sm font-semibold">{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
