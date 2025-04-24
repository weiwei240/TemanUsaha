import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/shared/Search";
import FilterDropdown from "@/components/shared/Filter";
import InventoryCard from "@/components/screens/InventoryCard";
import { router } from "expo-router";
import Header from "@/components/shared/Header";
import { products, categories } from "@/data/dummy";

const segments = ["All Categories", "Sort By", "Status"];

export default function Inventory() {
  const insets = useSafeAreaInsets();
  const handleFeatured = () => router.push('/Featured')
  const handleCategory = () => router.push('/Category')
  const handleCreateProduct = () => router.push('/CreateProduct')

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title="Inventory Management" onAdd={handleCreateProduct}/>

      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}>

        {/* Tabs */}
        <View className="flex-row px-5 pt-2 gap-3 mb-2">
          <TouchableOpacity
            className="flex-1 rounded-2xl flex-row items-center justify-center py-3 shadow-xl shadow-black-300 bg-white gap-2"
            onPress={handleFeatured}
          >
            <Image source={icons.medal} className="size-7"></Image>
            <Text className="text-black font-rubik-semibold text-lg">
              Featured (2)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-2xl flex-row items-center justify-center py-3 shadow-xl shadow-black-300 bg-white gap-2"
            onPress={handleCategory}
          >
            <Image source={icons.category} className="size-7"></Image>
            <Text className="text-black font-rubik-semibold text-lg">
              Category (2)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search & Filter */}
        <Search />
        <FilterDropdown segments={segments}/>

        {/* Product List */}
        {categories.map((category, index) => (
          <View key={index} className="px-5 pt-2">
            <Text className="text-base font-semibold mb-2">
              {category.name} ({category.itemCount})
            </Text>
            {products.map((item, i) => (
              item.category === category.name &&
              <InventoryCard item={item} key={i}/>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
