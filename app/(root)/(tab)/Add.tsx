import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Search from "@/components/shared/Search";
import { FilterHorizontal } from "@/components/shared/Filter";
import OrderCard from "@/components/screens/OrderCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "@/components/shared/Header";
import { useEffect, useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { formatCurrency } from "@/utils/format";
import { Product, OrderItem } from "@/types/types";
import React from "react";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getBusinessCategories, getBusinessProducts } from "@/lib/appwrite";
import { useBusinessParams } from "@/hooks/useBusinessParams";

const Add = () => {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const { items, setItems, totalPrice, totalItems } = useOrder();
  const params = useBusinessParams();

  const { data: products, loading:productsLoading } = useAppwrite({
    fn: getBusinessProducts,
    params: params!,
    skip: !params,
  });

  const {data: categories, loading:categoriesLoading} = useAppwrite({
    fn: getBusinessCategories,
    params: params!,
    skip: !params,
  })

  const categorySegments = (categories ?? []).map(({ id, name }) => ({ id, name }));

  const availableProducts = products?.filter((item) => item.active);

  const handleQuantityChange = (product: Product, quantity: number) => {
    if (quantity === 0) {
      setItems((prev: OrderItem[]) =>
        prev.filter((item: OrderItem) => item.name !== product.name)
      );
    } else {
      setItems((prev: OrderItem[]) => {
        const existing = prev.find((item: OrderItem) => item.name === product.name);
        if (existing) {
          return prev.map((item: OrderItem) =>
            item.name === product.name ? { ...item, qty: quantity } : item
          );
        } else {
          return [...prev, { ...product, qty: quantity }];
        }
      });
    }
  };

  const handleCartPress = () => router.push('/OrderConfirmation')

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title="Place Order"/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Search & Filter */}
        <Search />
        {categoriesLoading ? (
          <Text className="text-center text-gray-500 mt-4">Loading categories...</Text>
        ) : categories ? (
          <FilterHorizontal segments={categories}/>
        ) : (
          <Text className="text-center text-gray-500 mt-4">Categories not found</Text>
        )}

        {/* Product List */}
        <View className="px-5 py-2 gap-1">
          {productsLoading ? (
            <Text className="text-center text-gray-500 mt-4">Loading products...</Text>
          ) : availableProducts!.length === 0 ? (
            <Text className="text-center text-gray-500 mt-4">No active products available.</Text>
          ) : (
            availableProducts!.map((item, i) => {
              const existing = items.find((orderItem) => orderItem.name === item.name);
              const qty = existing?.qty ?? 0;
              return (
                <OrderCard
                  key={i}
                  item={{ ...item, qty }}
                  index={i}
                  onQuantityChange={(qty) => handleQuantityChange(item, qty)}
                />
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Cart */}
      {!keyboardVisible && totalItems !== 0 && (
        <View
          className="absolute bottom-32 left-0 right-0 px-4"
          style={{ paddingBottom: insets.bottom }}
        >
          <TouchableOpacity
            className="bg-green-600 py-4 rounded-2xl shadow-md shadow-zinc-500 p-4"
            onPress={() => handleCartPress()}
          >
            <View className="flex-row justify-center items-center ">
              <Ionicons name="cart" color="white" size={32}/>
              <Text className="text-white text-center text-lg font-rubik flex-1 mt-1">
                {totalItems} items
              </Text>
              <Text className="text-white text-center text-lg font-rubik-semibold flex-1 mt-1">
                {formatCurrency(totalPrice)}
              </Text>
              <Ionicons name="chevron-forward-outline" color="white" size={32}/>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Add;
