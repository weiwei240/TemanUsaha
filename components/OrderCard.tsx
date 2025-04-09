import { View, Text, ImageSourcePropType, Image, Switch, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons';
import { Ionicons } from '@expo/vector-icons';

interface Item {
  name: string;
  price: string;
  unit: string;
  sold: number;
  stock: number;
  image: ImageSourcePropType;
}

interface Props{
  item: Item;
  index: number;
}

const OrderCard = ({item, index}: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const increase = () => {
    if(quantity < item.stock) setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if(quantity > 0) setQuantity((prev) => prev - 1);
  };

  const handleInputChange = (text: string) => {
    const num = parseInt(text);
    if (!isNaN(num)) {
      if (num > item.stock) {
        setQuantity(item.stock);
      } else if (num >= 0) {
        setQuantity(num);
      }
    } else if (text === '') {
      setQuantity(0);
    }
  };

  return (
    // <View className='px-5 pt-2'>
      <View
        key={index}
        className="bg-white rounded-xl shadow-sm border border-gray-200 flex-row items-center p-1"
      >
        {/* Product */}
        <Image
          source={item.image}
          className="size-16 rounded-lg mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-base font-semibold" numberOfLines={1}>{item.name}</Text>
          <Text className="text-sm text-gray-600" numberOfLines={1}>
            {item.price} /{" "}
            <Text className="text-xs text-gray-400">{item.unit}</Text>
          </Text>
          <Text className={`text-xs ${quantity === item.stock ? 'text-red-500' : 'text-gray-500'}`}>
            📦 Stock: {item.stock}
          </Text>
        </View>

        {/* Add and Remove Buttons */}
        <View className='flex-row gap-2 mr-1'>
          <TouchableOpacity
            onPress={decrease}
            disabled={quantity === 0}
            className={`items-center justify-center px-3 py-3 rounded-lg shadow-md shadow-zinc-400 ${quantity === 0 ? 'bg-gray-300' : 'bg-green-600'}`}
          >
            <Ionicons name='remove' size={28} color='white'/>
          </TouchableOpacity>
          <TextInput
            keyboardType='numeric'
            value={quantity.toString()}
            onChangeText={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`text-center px-2 py-1 w-12 rounded-md ${isFocused === true ? 'border-b-2 border-green-600' : ''}`}
          />
          <TouchableOpacity
            onPress={increase}
            disabled={quantity === item.stock}
            className={`items-center justify-center px-3 py-3 rounded-lg shadow-md shadow-zinc-400 ${quantity === item.stock ? 'bg-gray-300' : 'bg-green-600'}`}
          >
            <Ionicons name='add' size={28} color='white'/>
          </TouchableOpacity>
        </View>
      </View>
    // </View>
  )
}

export default OrderCard