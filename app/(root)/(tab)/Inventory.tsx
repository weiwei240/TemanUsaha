import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import Search from "@/components/Search";
import FilterDropdown from "@/components/Filter";
import InventoryCard from "@/components/InventoryCard";
import { router } from "expo-router";
import Header from "@/components/Header";

const products = [
  {
    category: "Kitchen Appliances",
    items: [
      {
        name: "Non-Stick Pan",
        price: 90000,
        unit: "Pcs",
        sold: 90,
        stock: 20,
        image: images.pan,
        active: true,
      },
      {
        name: "Steel Knife Set",
        price: 60000,
        unit: "Pcs",
        sold: 60,
        stock: 60,
        image: images.kitchen,
        active: true,
      },
    ],
  },
  {
    category: "Daily Necessities",
    items: [
      {
        name: "Cooking Oil",
        price: 9000,
        unit: "Liter",
        sold: 345,
        stock: 30,
        image: images.fruit,
        active: true,
      },
      {
        name: "Egg",
        price: 22000,
        unit: "Kg",
        sold: 60,
        stock: 30,
        image: images.egg,
        active: true,
      },
    ],
  },
];

const segments = ["All Categories", "Sort By", "Status"];

export default function Inventory() {
  const insets = useSafeAreaInsets();
  const handleBack = () => router.push('/')
  const handleFeatured = () => router.push('/Featured')
  const handleCategory = () => router.push('/Category')
  const handleCreateProduct = () => router.push('/CreateProduct')

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
    >
      {/* Header */}
      <Header title="Inventory" onBack={handleBack} onAdd={handleCreateProduct}/>

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
      {products.map((section, index) => (
        <View key={index} className="px-5 pt-2">
          <Text className="text-base font-semibold mb-2">
            {section.category} ({section.items.length})
          </Text>
          {section.items.map((item, i) => (
            <InventoryCard item={item} key={i}/>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
