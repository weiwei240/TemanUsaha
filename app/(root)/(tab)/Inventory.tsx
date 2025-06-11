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
import { useAppwrite } from "@/hooks/useAppwrite";
import { getBusinessCategories, getBusinessProducts } from "@/lib/appwrite";
import { Category } from "@/types/types";
import { useBusinessParams } from "@/hooks/useBusinessParams";

const segments = ["All Categories", "Sort By", "Status"];

export default function Inventory() {
  const insets = useSafeAreaInsets();
  const handleFeatured = () => router.push('/Featured')
  const handleCategory = () => router.push('/Category')
  const handleCreateProduct = () => router.push('/CreateProduct')
  const params = useBusinessParams();

  const { data: products, loading:productsLoading } = useAppwrite({
    fn: getBusinessProducts,
    params: params!,
    skip: !params,
  });

  const { data: categories, loading: categoriesLoading } = useAppwrite<Category[], { businessId: string }>({
    fn: getBusinessCategories,
    params: params!,
    skip: !params, // optional: skip if businessId isn't ready
  })

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
              Featured
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-2xl flex-row items-center justify-center py-3 shadow-xl shadow-black-300 bg-white gap-2"
            onPress={handleCategory}
          >
            <Image source={icons.category} className="size-7"></Image>
            <Text className="text-black font-rubik-semibold text-lg">
              Categories
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search & Filter */}
        <Search />
        {categoriesLoading ? (
          <Text className="text-center text-gray-500 mt-4">Loading categories...</Text>
        ) : categories ? (
          <FilterDropdown segments={segments}/> // TBA
        ) : (
          <Text className="text-center text-gray-500 mt-4">Categories not found</Text>
        )}

        {/* Product List */}
        {categoriesLoading || productsLoading ? (
          <Text className="text-center text-gray-500 mt-4">Loading products...</Text>
        ) : !categories || !products || categories.length === 0 ? (
          <Text className="text-center text-gray-500 mt-4">No active products available.</Text>
        ) : (
          categories.map(category => {
            const linkedProducts = products.filter(product =>
              (product.categories ?? []).map((c: any) => c.$id ?? c).includes(category.id)
            );

            return (
              <View key={category.id} className="px-5 pt-2">
                {linkedProducts.length !== 0 && 
                  <Text className="text-base font-semibold mb-2">
                    {category.name} ({linkedProducts.length})
                  </Text>
                }
                {linkedProducts.map(product => (
                  <InventoryCard key={product.id} item={product} />
                ))}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
