import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import Header from '@/components/shared/Header'

const options = ["Cash", "Bank Transfer", "Debit Card", "Others"]

const PaymentMethods = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/OrderConfirmation')
  const handleConfirmPayment = () => router.push('/CompletePayment')

  const [selected, setSeleceted] = useState('QRIS')

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Payment Methods' onBack={handleBack}/>

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Total Payment */}
        <View className='flex-col px-5 py-2'>
          <View className="flex flex-row items-center justify-between mt-2 mb-2">
            <Text className='text-xl font-rubik-semibold'>Total Payment</Text>
            <TouchableOpacity onPress={() => handleBack()}>
              <Text className="text-xl font-rubik-bold">Rp 177.000</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="h-px bg-gray-200"/>

        <View className='flex-col px-5 py-2'>
          <View className="flex flex-col items-start justify-between py-2">
            <Text className='text-xl font-rubik-semibold'>Choose your Payment Method</Text>
            <Text className='text-lg mt-4 font-rubik'>Our payment methods</Text>
            <Text className='font-rubik text-xs'>Payments will  be deposited into your app balance</Text>
          </View>
          
          {/* Options */}
          <TouchableOpacity
            className={`flex flex-row border rounded-xl items-center p-4 w-2/3 mt-2 mb-2 ${selected === 'QRIS' ? 'border-green-600 bg-green-600' : ''}`}
            onPress={() => setSeleceted('QRIS')}
          >
            <Ionicons name='qr-code-outline' size={32} color={`${selected === 'QRIS' ? 'white' : 'black'}`}/>
            <Text className={`text-2xl font-rubik-semibold ml-4 ${selected === 'QRIS' ? 'text-white' : 'text-black'}`}>QRIS</Text>
          </TouchableOpacity>

          <Text className='text-lg mt-4 font-rubik'>Other payment methods?</Text>

          {options.map((option) => (
            <TouchableOpacity
              key={option}
              className={`flex flex-row border rounded-xl items-center p-4 w-2/3 mt-2 mb-2 ${selected === option ? 'border-green-600 bg-green-600' : ''}`}
              onPress={() => setSeleceted(option)}
            >
              <Text className={`text-2xl font-rubik-semibold ml-4 ${selected === option ? 'text-white' : 'text-black'}`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Button */}
      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
        <View className='flex flex-col items-center'>
          <View className='px-5 py-2 w-full'>
            <TouchableOpacity
              className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
              onPress={() => handleConfirmPayment()}
            >
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Confirm Payment Method</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default PaymentMethods