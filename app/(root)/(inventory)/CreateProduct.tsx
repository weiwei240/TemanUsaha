import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const CreateProduct = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
    >
        <Header title='Create Product' back={handleBack}/>
    </ScrollView>
  )
}

export default CreateProduct