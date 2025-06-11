import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router, Link } from 'expo-router';

type RoutePath = React.ComponentProps<typeof Link>['href'];

interface Props{
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  route: RoutePath;
}

const OptionItem = ({icon, text, route}: Props) => {
  return (
    <TouchableOpacity className='border-b border-gray-200 p-2 mx-2 justify-between flex-row' onPress={() => router.push(route)}>
      <View className='flex-row gap-2'>
        <Ionicons name={icon} size={24} color='black'/>
        <Text className='font-rubik'>{text}</Text>
      </View>
      <Ionicons name='chevron-forward' size={24} color='black'/>
    </TouchableOpacity>
  )
}

export default OptionItem