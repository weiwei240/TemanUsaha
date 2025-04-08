import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Switch } from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useState } from "react";

const products = [
  {
    category: "Kitchen Appliances",
    items: [
      {
        name: "Non-Stick Pan",
        price: "Rp 90.000",
        unit: "Pcs",
        sold: 90,
        stock: 20,
        image: images.pan,
        active: true,
      },
      {
        name: "Steel Knife Set",
        price: "Rp 60.000",
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
        price: "Rp 9.000",
        unit: "Liter",
        sold: 345,
        stock: 30,
        image: images.fruit,
        active: true,
      },
      {
        name: "Egg",
        price: "Rp 22.000",
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
  const [selected, setSelected] = useState(0);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
    >
      {/* Header */}
      <View className="bg-green-700 p-4 rounded-b-3xl flex-row items-center justify-between">
        <Text className="text-white text-2xl font-bold">
          Inventory{"\n"}Management
        </Text>
        <View className="flex-row gap-3">
          <Image source={icons.plus} className="size-7" tintColor="white" />
          <Image source={icons.settings} className="size-7" tintColor="white" />
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 pt-2 gap-3 mb-2">
        <View className="flex-1 rounded-2xl flex-row items-center justify-center py-3 shadow-xl shadow-black-300 bg-white gap-2">
          <Image source={icons.medal} className="size-7"></Image>
          <Text className="text-black font-rubik-semibold text-lg">
            Featured (2)
          </Text>
        </View>
        <View className="flex-1 rounded-2xl flex-row items-center justify-center py-3 shadow-xl shadow-black-300 bg-white gap-2">
          <Image source={icons.category} className="size-7"></Image>
          <Text className="text-black font-rubik-semibold text-lg">
            Category (2)
          </Text>
        </View>
      </View>

      {/* Search & Filter */}
      <View className="flex-row items-center bg-white rounded-full px-4 py-1 mx-5 shadow-md">
        <Image
          source={icons.search}
          className="w-5 h-5 mr-3"
          tintColor="#2D2D2D"
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#2D2D2D"
          className="flex-1 text-base text-[#2D2D2D]"
        />
        <TouchableOpacity>
          <Image
            source={icons.filter}
            className="w-5 h-5"
            tintColor="#2D2D2D"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between px-5 py-2">
        {segments.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelected(index)}
            className={`px-4 py-2 rounded-full border flex-row items-center justify-between gap-3 
            border-gray-500"}
          `}
          >
            <Text
              className={`text-sm font-rubik-medium text-gray-700"
              }`}
            >
              {item}
            </Text>
            <Image
              source={icons.dropdown}
              className="size-3"
              tintColor={"black"}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product List */}
      {products.map((section, index) => (
        <View key={index} className="px-5 pt-2">
          <Text className="text-base font-semibold mb-2">
            {section.category} ({section.items.length})
          </Text>
          {section.items.map((item, i) => (
            <View
              key={i}
              className="bg-white rounded-xl shadow-sm border border-gray-200 flex-row items-center p-3 mb-3"
            >
              <Image
                source={item.image}
                className="size-16 rounded-lg mr-3"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-base font-semibold">{item.name}</Text>
                <Text className="text-sm text-gray-600">
                  {item.price} /{" "}
                  <Text className="text-xs text-gray-400">{item.unit}</Text>
                </Text>
                <View className="flex-row items-center gap-3 mt-1">
                  <Text className="text-xs text-gray-500">
                    🛒 Sold: {item.sold}
                  </Text>
                  <View className="w-px h-full bg-gray-300 " />
                  <Text className="text-xs text-gray-500">
                    📦 Stock: {item.stock}
                  </Text>
                </View>
              </View>
              <Switch
                value={item.active}
                thumbColor="#15803d"
                trackColor={{ false: "#fff", true: "#d1fae5" }} // false = light green, true = vibrant green
              />

              <Image source={icons.more} className="w-4 h-4 ml-2" />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
