import { View, Text, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import OrderCard from '@/components/screens/OrderCard';
import { router } from 'expo-router';
import Header from '@/components/shared/Header';
import { useOrder } from '@/context/OrderContext';
import { formatCurrency } from '@/utils/format';

const OrderConfirmation = () => {
  const insets = useSafeAreaInsets();

  const [keyboardVisible, setKeyboardVisible] = useState(false)

    const { items, setItems, totalPrice, discount, setDiscount, finalTotal } = useOrder();
    
    const handleQuantityChange = (product: any, quantity: number) => {
      if (quantity === 0) {
        setItems((prev) => prev.filter((item) => item.name !== product.name));
      } else {
        setItems((prev) => {
          const existing = prev.find((item) => item.name === product.name);
          if (existing) {
            return prev.map((item) =>
              item.name === product.name ? { ...item, qty: quantity } : item
          );
        } else {
          return [...prev, { ...product, qty: quantity }];
        }
      });
    }
  };

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

  const handlePlaceOrder = () => {
    router.push('/PaymentMethods')
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Order Confirmation'/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Order Summary */}
        <View className='flex-col px-5 py-2 gap-1'>
          <View className="flex flex-row items-center justify-between mt-2 mb-2">
            <Text className='text-xl font-rubik-semibold'>Order Summary</Text>
            <TouchableOpacity onPress={() => router.push('/Add')}>
              <Text className="text-base font-rubik text-green-400">Add Items</Text>
            </TouchableOpacity>
          </View>
          {/* {products.map((section) => 
              section.items.map((item, i) => (
                <OrderCard key={i} item={item} index={i} onQuantityChange={(qty) => handleQuantityChange(item, qty)}/>
              ))
          )} */}
          {items.map((item, i) => (
            <OrderCard key={i} item={item} index={i} onQuantityChange={(qty) => handleQuantityChange(item, qty)}/>
          ))}
        </View>

        {/* Payment Summary */}
        <View className='flex-col px-5 py-1'>
          <View className="flex flex-row items-center justify-between mt-2 mb-2">
            <Text className='text-xl font-rubik-semibold'>Payment Summary</Text>
          </View>
          <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600 font-rubik">Subtotal</Text>
              <Text className="text-base text-gray-800 font-rubik">{formatCurrency(totalPrice)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600 font-rubik">Order fee</Text>
              <Text className="text-base text-gray-800 font-rubik">Rp 5.000</Text>
            </View>
            <View className="h-px bg-gray-200 my-2" />
            <View className="flex-row justify-between">
              <Text className="text-base font-rubik-bold">Total payment</Text>
              <Text className="text-base font-rubik-bold">{formatCurrency(totalPrice + 5000)}</Text>
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
                keyboardType='numeric'
                value={formatCurrency(discount)}
                onChangeText={(text) => {
                  const numeric = parseInt(text.replace(/[^0-9]/g, '')) || 0;
                  setDiscount(numeric);
                }}
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
      {!keyboardVisible && (
        <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
          <View className='flex flex-col items-center'>
            <View className='flex flex-row items-start justify-between w-full px-5 pt-2'>
              <Text className='text-base font-rubik-medium'>Total</Text>
              <Text className='text-base text-start font-rubik-bold'>{formatCurrency(finalTotal)}</Text>
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
      )}
    </View>
  )
}

export default OrderConfirmation