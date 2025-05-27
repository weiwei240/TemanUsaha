import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Search from '@/components/shared/Search'
import FilterDropdown from '@/components/shared/Filter'
import AttentionSummaryCard from '@/components/shared/AttentionSummaryCard'

const segments = ["Date", "Sort By", "Name", "Status"]

const Billing = () => {
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
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Attention Offers</Text>
            <Text className="text-xs text-gray-500 mt-[-2px]">
              Prevent offers from missing the deadline!
            </Text>
          </View>

          <AttentionSummaryCard
            ionicons={["checkmark-circle", "close-circle", "chatbubbles"]}
            titles={["Accept", "Decline", "No Response"]}
            values={[74000, 50000, 20000]}
            colors={["#0000FF", "#FF0000", "#F2A000"]}
          />
          
          <Text className='text-xl font-rubik-semibold py-2'>Offers Transactions</Text>

          <Search />
        <FilterDropdown segments={segments}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default Billing