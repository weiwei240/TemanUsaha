import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/shared/Header'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import images from '@/constants/images'

const items = [
  { name: 'Non-Stick Pan', qty: 1, price: 'Rp 90.000' },
  { name: 'Steel Knife Set', qty: 1, price: 'Rp 60.000' },
  { name: 'Egg', qty: 1, price: 'Rp 22.000' },
]

const Receipt = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/')

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
      <Header title='Receipt' onBack={handleBack}/>

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <Text className='text-xl font-rubik-semibold text-center my-4'>Payment Completed!</Text>

        {/* Receipt */}
        <View className='flex-col justify-center items-center px-5 py-2'>
          <View className="bg-green-50 rounded-2xl p-5 shadow-md w-full">
            {/* Success Badge */}
            <View className="flex flex-row justify-center mb-3">
              <View className="bg-green-200 px-3 py-1 rounded-full flex-row items-center">
                <Ionicons name="checkmark-circle" size={24} color="green" />
                <Text className="ml-1 text-green-700 font-rubik-medium">Success</Text>
              </View>
            </View>

            {/* Profile */}
            <View className="items-center">
              <Image
                source={images.avatar}
                className="w-16 h-16 rounded-full mb-1"
              />
              <Text className="text-lg font-rubik-bold">Jus Jeruk</Text>
              <Text className="text-xs text-gray-500 font-rubik mt-1">17 Aug 2024, 14:50 PM</Text>
            </View>

            <View className="border-b border-green-500 my-4" />

            {/* Payment Summary */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base font-rubik-bold">Total Payment</Text>
              <Text className="text-base font-rubik-bold">Rp 177.000</Text>
            </View>

            {/* Item List */}
            {items.map((item, index) => (
              <View key={index} className="flex-row justify-between mb-1">
                <Text className="flex-1 text-sm">{item.name}</Text>
                <Text className="w-8 text-sm text-center">x {item.qty}</Text>
                <Text className="w-20 text-right text-sm">{item.price}</Text>
              </View>
            ))}

            <View className="border-b border-green-500 my-4" />

            {/* Fee & Discount */}
            <View className="flex-row justify-between mt-2">
              <Text className="text-sm">Order fee</Text>
              <Text className="text-sm">Rp 5.000</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm">Discount</Text>
              <Text className="text-sm">0</Text>
            </View>

            <View className="border-b border-green-500 my-4" />

            {/* Contact Button */}
            <View className="flex-row items-center bg-white border border-green-500 rounded-lg text-sm px-2">
              <TextInput
                placeholder="Connect to customer"
                className="flex-1"
              />
              <TouchableOpacity className="justify-center items-center">
                <Ionicons name="person-circle-outline" size={32} color="green" />
              </TouchableOpacity>
            </View>
          </View>
        </View>    
      </ScrollView>

      {/* Button */}
      {!keyboardVisible && (
        <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
          <View className='flex flex-col items-center'>
            <View className='px-5 py-2 w-full gap-4'>
              <TouchableOpacity
                className='items-center justify-center bg-white border border-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
                onPress={() => handleBack()}
              >
                <Text className='text-green-600 text-lg text-center font-rubik-bold mt-1'>Print Receipt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
                onPress={() => handleBack()}
              >
                <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Send Bill</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default Receipt