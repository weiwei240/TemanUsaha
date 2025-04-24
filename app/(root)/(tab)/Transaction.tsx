import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { router } from 'expo-router'

const Transaction = () => {

  return (
    <View className='flex-1 bg-white'>
      <Header title='Transactions'/>

    </View>
  )
}

export default Transaction