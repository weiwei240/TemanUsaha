import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props{
  title: string;
  back: () => void;
}

const Header = ({title, back}: Props) => {
  return (
    <View className="bg-green-700 p-4 rounded-b-3xl flex-row items-center mb-2 gap-2">

      <TouchableOpacity onPress={back}>
        <Ionicons name='chevron-back-outline' color="white" size={32}/>
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold">
        {title}
      </Text>
    </View>
  )
}

export default Header