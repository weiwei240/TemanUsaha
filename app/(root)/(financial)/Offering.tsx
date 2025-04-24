import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const Offering = () => {
  const insets = useSafeAreaInsets()
  const handleCreateOffer = () => router.push('/')

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title="Offering" onAdd={handleCreateOffer}/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <View className='px-5 py-2'>
          
        </View>
      </ScrollView>
    </View>
  )
}

export default Offering