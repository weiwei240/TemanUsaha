import { View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'

const Search = () => {
  return (
    <View className="flex-row items-center bg-white rounded-full px-5 py-1 mx-5 mt-2 mb-2 shadow-md">
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
  )
}

export default Search