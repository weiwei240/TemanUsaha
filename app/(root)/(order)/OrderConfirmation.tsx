import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '@/constants/images';
import OrderCard from '@/components/OrderCard';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';

const products = [
  {
    category: "Kitchen Appliances",
    items: [
      {
        name: "Non-Stick Pan",
        price: "Rp 90.000",
        unit: "Pcs",
        sold: 90,
        stock: 20,
        image: images.pan,
        active: true,
      },
      {
        name: "Steel Knife Set",
        price: "Rp 60.000",
        unit: "Pcs",
        sold: 60,
        stock: 60,
        image: images.kitchen,
        active: true,
      },
    ],
  },
  {
    category: "Daily Necessities",
    items: [
      {
        name: "Cooking Oil",
        price: "Rp 9.000",
        unit: "Liter",
        sold: 345,
        stock: 30,
        image: images.fruit,
        active: true,
      },
      {
        name: "Egg",
        price: "Rp 22.000",
        unit: "Kg",
        sold: 60,
        stock: 30,
        image: images.egg,
        active: true,
      },
    ],
  },
];

const OrderConfirmation = () => {
  const insets = useSafeAreaInsets();
  const handleBack = () => router.push('/Add')
  const handlePlaceOrder = () => router.push('/PaymentMethods') // Payment Methods

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
      >
        {/* Header */}
        <Header title='Order Confirmation' back={handleBack}/>

        {/* Order Summary */}
        <View className='flex-col px-5 py-2'>
          <View className="flex flex-row items-center justify-between mt-2 mb-2">
            <Text className='text-xl font-rubik-semibold'>Order Summary</Text>
            <TouchableOpacity onPress={() => handleBack()}>
              <Text className="text-base font-rubik text-green-400">Add Items</Text>
            </TouchableOpacity>
          </View>
          {products.map((section) => 
              section.items.map((item, i) => (
                <OrderCard key={i} item={item} index={i}/>
              ))
          )}
        </View>

        {/* Payment Summary */}
        <View className='flex-col px-5 py-1'>
          <View className="flex flex-row items-center justify-between mt-2 mb-2">
            <Text className='text-xl font-rubik-semibold'>Payment Summary</Text>
          </View>
          <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600 font-rubik">Subtotal</Text>
              <Text className="text-base text-gray-800 font-rubik">Rp 172.000</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600 font-rubik">Order fee</Text>
              <Text className="text-base text-gray-800 font-rubik">Rp 5.000</Text>
            </View>
            <View className="h-px bg-gray-200 my-2" />
            <View className="flex-row justify-between">
              <Text className="text-base font-rubik-bold">Total payment</Text>
              <Text className="text-base font-rubik-bold">Rp 177.000</Text>
            </View>
          </View>
        </View>

        {/* Discount & Voucher */}
        <View className="flex-col px-5 py-2">
          <View className="flex flex-row items-center justify-between mt-2 mb-2">
            <View className='flex-1'>
              <Text className='text-base font-rubik-semibold'>Discount</Text>
            </View>
            <View className='flex-1'>
              <Text className='text-base font-rubik-semibold'>Voucher</Text>
            </View>
          </View>
          <View className='flex-row gap-2 '>
            <View className="flex-1 border border-gray-300 rounded-lg px-2">
              <TextInput
                placeholder='Rp 0.00'
                className='text-sm'
              />
            </View>
            <View className="flex-1 border border-gray-300 rounded-lg px-2">
              <TextInput
                placeholder='Enter promo code...'
                className='text-sm'
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button */}
      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
        <View className='flex flex-col items-center'>
          <View className='flex flex-row items-start justify-between w-full px-5 pt-2'>
            <Text className='text-base font-rubik-medium'>Total</Text>
            <Text className='text-base text-start font-rubik-bold'>Rp 177.000</Text>
          </View>
          <View className='px-5 py-2 w-full'>
            <TouchableOpacity
              className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
              onPress={() => handlePlaceOrder()}
            >
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default OrderConfirmation