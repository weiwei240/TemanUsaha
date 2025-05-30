import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons';

interface Props{
  segments: string[];
}

const FilterDropdown = ({segments}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <View className="flex-row justify-between px-5 py-2 gap-2">
      {segments.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedCategory(index)}
          className={`px-4 py-2 rounded-full border flex-row items-center justify-between gap-2
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
  )
}

export const FilterHorizontal = ({segments}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = (category:string) => {
    if(selectedCategory === category){
      setSelectedCategory('All');
      return;
    }
    setSelectedCategory(category);
  }
  
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='py-2 ml-2 mr-5'>
      {segments.map((item, index) => (
        <TouchableOpacity 
          key={index}
          onPress={() => handleCategoryPress(item)}
          className={`flex flex-col ml-2 mr-2 px-4 py-2 rounded-full border border-green-600 items-center ${
            selectedCategory === item ? 'bg-green-600' : 'bg-white'
          }`}
        >
          <Text className={`text-sm mt-1 font-rubik ${selectedCategory === item ? 'text-white' : 'text-black-300'}`}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export const FilterSwitch = ({segments}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(segments[0]);

  const handleCategoryPress = (category:string) => {
    setSelectedCategory(category);
    return;
  }
  
  return (
    <View className='flex-row py-2 ml-2 mr-5 justify-center items-center bg-green-600 rounded-full'>
      {segments.map((item, index) => (
        <TouchableOpacity 
          key={index}
          onPress={() => handleCategoryPress(item)}
          className={`flex flex-col ml-2 mr-2 px-8 rounded-full items-center ${
            selectedCategory === item ? 'bg-white' : 'bg-green-600'
          }`}
        >
          <Text className={`text-sm mt-1 font-rubik ${selectedCategory === item ? 'text-green-600' : 'text-white'}`}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default FilterDropdown