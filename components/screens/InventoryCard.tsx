import { View, Text, Image, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { formatCurrency } from '@/utils/format'
import { Product } from '@/types/types'
import { router } from 'expo-router'

interface Props{
  item: Product
}

const InventoryCard = ({item}: Props) => {
  const [isActive, setIsActive] = useState(item.active)
  const handleMore = () => router.push({ pathname: '/EditProduct', params: {id: item.id} })

  return (
    <View
      className={`rounded-xl shadow-sm border flex-row items-center p-3 mb-3 ${isActive ? 'bg-white border-gray-200' : 'bg-gray-200 border-gray-300'}`}
    >
      <Image
        source={item.image}
        className="size-16 rounded-lg mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold">{item.name}</Text>
        <Text className="text-sm text-gray-600">
          {formatCurrency(item.price)} /{" "}
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
        value={isActive}
        onValueChange={setIsActive}
        thumbColor={isActive ? "#15803d" : "#727272"}
        trackColor={{ false: "#fff", true: "#d1fae5" }}
      />
      <TouchableOpacity onPress={handleMore}>
        <Image source={icons.more} className="w-4 h-4 ml-2" />
      </TouchableOpacity>
    </View>
  )
}

export default InventoryCard