import { View, Text, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "@/constants/images";
import UserBalanceCard from "@/components/BalanceCard";
import { FeatureMenu } from "@/components/FeatureMenu";
import FinancialReportCard from "@/components/FinancialReport";
import icons from "@/constants/icons";

export default function Home() {
  const insets = useSafeAreaInsets();

  const dummyArticles = [
    {
      title: "5 Key Strategies to Drive Business Growth",
      img: "https://via.placeholder.com/150",
    },
    {
      title: "Adapting to Change: How Businesses Thrive in Uncertainty",
      img: "https://via.placeholder.com/150",
    },
  ];

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
              source={images.avatar}
              className="size-16 rounded-full border-2 border-white"
            />
            <View>
              <Text className="text-white text-xl font-rubik-bold">
                Pelita Jaya Store
              </Text>
              <Text className="text-white text-sm font-rubik">
                Edit Profile ✏️
              </Text>
            </View>
          </View>
          <View className="flex-row gap-3">
            <Image source={icons.share} className="size-6" />
            <Image source={icons.settings} className="size-6" />
          </View>
        </View>

        {/* Balance */}
        <UserBalanceCard />
      </View>

      {/* Feature Menu */}
      <FeatureMenu />

      {/* Financial Report */}
      <FinancialReportCard />

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
