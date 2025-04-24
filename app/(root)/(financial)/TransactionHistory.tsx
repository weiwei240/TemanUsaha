import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/shared/Header';
import { formatCurrency } from '@/utils/format';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import FilterDropdown from '@/components/shared/Filter';
import { transactions } from '@/data/dummy';

type Transaction = {
  id: string;
  name: string;
  method: string;
  date: string;
  amount: number;
  status: string;
  isExpense: boolean;
};

const segments = ["All Categories", "Sort By", "Status"];

const TransactionHistoryScreen = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/')

  const renderItem = ({ item }: {item: Transaction}) => (
    <View className="border-b border-gray-200 py-3 px-4">
      <Text className="text-xs text-gray-500 font-rubik">{item.date}</Text>
      <View className="flex-row justify-between items-center">
        <View className='flex-row items-center'>
          {item.status === 'Ongoing' ?
            <View className='size-4 bg-blue-600 rounded-full mr-4'/>
          :
            <View></View>
          }
          <View>
            <Text className="text-base font-rubik-semibold">{item.name}</Text>
            <Text className="text-xs text-gray-500 font-rubik">{item.method}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className={`font-rubik-bold ${item.isExpense ? 'text-red-600' : 'text-green-700'}`}>
            {item.isExpense ? '-' : '+'}{formatCurrency(item.amount)}
          </Text>
          <View className={`justify-center items-center p-2 rounded-xl flex-row gap-2 ${item.status === 'Success' ? 'bg-green-200' : 'bg-blue-200'}`}>
            <Ionicons
              name={`${item.status === 'Success' ? 'checkmark-circle' : 'hourglass'}`}
              size={16}
              color={`${item.status === 'Success' ? 'green' : 'blue'}`}
            />
            <Text className={`text-xs font-rubik ${item.status === 'Success' ? 'text-green-600' : 'text-blue-700'}`}>{item.status}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Transaction History' onBack={handleBack}/>

      {/* Transaction List */}
      <SectionList
        sections={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="px-4 py-4 font-rubik-bold border-b-2 border-green-600">{title}</Text>
        )}
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
        ListHeaderComponent={
          <FilterDropdown segments={segments} />
        }
      />
    </View>
  );
};

export default TransactionHistoryScreen;
