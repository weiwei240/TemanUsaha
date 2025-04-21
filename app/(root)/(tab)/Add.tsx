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
import { products } from "@/data/dummy";

const segments = ["All", "Category 1", "Category 2", "Category 3", "Category 4", "Category 5"];

const Add = () => {
  const insets = useSafeAreaInsets();
  const handleBack = () => router.push('/')
  const handleCartPress = () => router.push('/OrderConfirmation')
  
  const [keyboardVisible, setKeyboardVisible] = useState(false)

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
      <Header title="Place Order" onBack={handleBack}/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Search & Filter */}
        <Search />
        <FilterHorizontal segments={segments}/>

        {/* Product List */}
        <View className="px-5 py-2 gap-1">
          {products.map((section) => 
                section.items.map((item, i) => (
                  <OrderCard key={i} item={item} index={i}/>
                ))
          )}
        </View>
      </ScrollView>

      {/* Cart */}
      {!keyboardVisible && (
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
                3 items
              </Text>
              <Text className="text-white text-center text-lg font-rubik-semibold flex-1 mt-1">
                Rp 142.200
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
