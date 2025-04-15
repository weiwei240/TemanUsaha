import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { router } from 'expo-router'

const Transaction = () => {
  const handleBack = () => router.push('/')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Transactions' onBack={handleBack}/>

    </View>
  )
}

export default Transaction