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
  const handleCreateBill = () => router.push('/')

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title="Billing" onAdd={handleCreateBill}/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <View className='px-5 py-2'>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Attention Bills</Text>
            <Text className="text-xs text-gray-500 mt-[-2px]">
              Prevent bills from missing the deadline!
            </Text>
          </View>

          <AttentionSummaryCard
            ionicons={["checkmark-circle", "timer", "ban"]}
            titles={["Paid", "Due Date", "Not Paid"]}
            values={[102000, 50000, 24000]}
            colors={["#1AAF1A", "#FF0000", "#FFA500"]}
          />
          
          <Text className='text-xl font-rubik-semibold py-2'>Bills Transactions</Text>

          <Search />
        <FilterDropdown segments={segments}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default Billing