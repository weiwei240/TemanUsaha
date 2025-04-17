import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import images from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'

const Settings = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/')

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Settings' onBack={handleBack} white/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <View className='px-5 py-2'>
          <View className='bg-green-600 rounded-xl flex-1 flex-col p-4'>
            <View className='flex-row justify-between'>
              <Image source={images.avatar} className="size-24 rounded-full border-2 border-white"/>
              <View className='flex-col p-2 w-7/12'>
                <Text className='text-lg text-white font-rubik-semibold'>Jus Jeruk</Text>
                <Text className='text-xs text-gray-200 font-rubik'>Restaurant</Text>
                <View className='flex-row'>
                  <Ionicons name='call' color='white' size={16}/>
                  <Text numberOfLines={1} className='text-sm text-white font-rubik'>+6282399012131</Text>
                </View>
                <View className='flex-row'>
                  <Ionicons name='location' color='white' size={16}/>
                  <Text numberOfLines={2} className='text-sm text-white font-rubik'>Anggrek Mansion, Kemanggisan, Indonesia</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name='pencil' color='white' size={24}/>
              </TouchableOpacity>
            </View>
            <View className='flex-row justify-between mt-2'>
              <TouchableOpacity className='flex-row bg-green-600 rounded-xl p-2 items-center justify-center'>
                <Text className='mx-1 text-white font-rubik-semibold text-sm'>Switch Business</Text>
                <Ionicons name='chevron-down' color='white' size={24}/>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row bg-white rounded-xl p-2 items-center justify-center'>
                <Ionicons name='add-circle' color='green' size={24}/>
                <Text className='mx-2 text-green-600 font-rubik-semibold text-sm'>New Business</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings