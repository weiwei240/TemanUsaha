import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '@/constants/images'
import { useOrderContext } from '@/context/OrderContext'
import { formatCurrency } from '@/utils/format'

const CompletePayment = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/PaymentMethods')
  
  const {totalPrice, setTransactionTime} = useOrderContext()
  const handleCheckReceipt = () => {
    const now = new Date();
    const formatted = now.toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    router.push('/Receipt')
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Complete Payment' onBack={handleBack}/>

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* QR Code */}
        <View className='flex-col px-5 py-2 justify-center items-center h-full'>
          <Text className='w-2/3 text-center mt-2 font-rubik'>Scan this QR Code to complete the payment</Text>
          <Text className='text-2xl font-rubik-bold py-6'>Jus Jeruk</Text>
          <Image source={images.qrcode}/>
          <Text className='text-3xl font-rubik-bold py-6'>{formatCurrency(totalPrice)}</Text>
        </View>
      </ScrollView>

      {/* Button */}
      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
        <View className='flex flex-col items-center'>
          <View className='px-5 py-2 w-full'>
            <TouchableOpacity
              className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
              onPress={() => handleCheckReceipt()}
            >
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Check Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CompletePayment