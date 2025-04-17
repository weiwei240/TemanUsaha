import { View, Text, ScrollView, SectionList } from 'react-native'
import React from 'react'
import Header from '@/components/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { formatCurrency } from '@/utils/format';
import { Ionicons } from '@expo/vector-icons';

const customers = [
  {
    id: '1',
    name: 'Megawanto',
    phone: '081234567890',
    totalSpending: 100_000_000,
    transactions: 28,
  },
  {
    id: '2',
    name: 'Elianna',
    phone: '081234567891',
    totalSpending: 80_000_000,
    transactions: 20,
  },
  {
    id: '3',
    name: 'Susanto',
    phone: '081234567892',
    totalSpending: 65_000_000,
    transactions: 18,
  },
  {
    id: '4',
    name: 'Adi',
    phone: '081234567893',
    totalSpending: 10_000_000,
    transactions: 6,
  },
  {
    id: '5',
    name: 'Bima',
    phone: '081234567894',
    totalSpending: 15_000_000,
    transactions: 7,
  },
  {
    id: '6',
    name: 'Anna',
    phone: '081234567895',
    totalSpending: 18_000_000,
    transactions: 8,
  },
  {
    id: '7',
    name: 'Aron',
    phone: '081234567896',
    totalSpending: 25_000_000,
    transactions: 12,
  },
  {
    id: '8',
    name: 'Cassandra',
    phone: '081234567897',
    totalSpending: 12_000_000,
    transactions: 5,
  },
];

const Customer = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/')
  const handleAddCustomer = () => router.push('/')

  const sortedCustomers = [...customers].sort((a, b) => b.totalSpending - a.totalSpending)
  const topCustomers = sortedCustomers.slice(0, 3);

   const contactSections = Object.values(
    customers.reduce((acc, curr) => {
      const firstLetter = curr.name[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = { title: firstLetter, data: [] };
      }
      acc[firstLetter].data.push(curr);
      return acc;
    }, {} as Record<string, { title: string; data: typeof customers }>)
  ).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Customer' onBack={handleBack} onAdd={handleAddCustomer}/>
      
      <View style={{ paddingTop: insets.top + 80}} className='px-5 py-2'>
        <SectionList
          sections={contactSections}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="px-4 py-2 border-t border-gray-200">
              <Text className="text-gray-800 ml-4">{item.name}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View className="bg-green-100 px-4 py-2 border-t border-green-700">
              <Text className="text-green-700 font-bold">{title}</Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={
            <View>
              <View className="flex-row justify-between items-center mb-2">
                <View>
                  <Text className="text-lg font-semibold">Leaderboard</Text>
                  <Text className="text-xs text-gray-500 mt-[-2px]">
                    Result of accumulated spending in a month
                  </Text>
                </View>
                <Text className="text-sm text-blue-500 font-medium">View All</Text>
              </View>
              
              <View className="bg-green-700 p-3 rounded-2xl shadow-md my-2">
                <View className="flex-row justify-between mb-2 items-center">
                  <Text className="text-white font-rubik-bold text-lg">Top 3 Spending</Text>
                  <View className='flex-row gap-2'>
                    <Text className="text-white text-xs font-rubik">01 Aug 2024 - 31 Aug 2024</Text>
                    <Ionicons name='calendar' color='white'/>
                  </View>
                </View>
                {topCustomers.map((customer, index) => (
                  <View
                    key={customer.id}
                    className="bg-white rounded-xl px-3 py-2 mb-2 flex-row justify-between items-center"
                  >
                    <View className="flex-row items-center gap-2">
                      <Text className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</Text>
                      <View>
                        <Text className="font-semibold text-gray-800">{customer.name}</Text>
                        <Text className="text-xs text-gray-500">{customer.transactions} transactions</Text>
                      </View>
                    </View>
                    <Text className="font-bold text-green-700">
                      {formatCurrency(customer.totalSpending)}
                    </Text>
                  </View>
                ))}
              </View>
              <Text className='text-xl font-rubik-semibold py-2'>Contact List</Text>
            </View>
          }
        />
      </View>
    </View>
  )
}

export default Customer