import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Search from '@/components/Search'
import { FilterSwitch } from '@/components/Filter'

const dummyTransactions = [
  {
    type: 'Order',
    id: '24SEAA',
    message: 'Order #24SEAA has been paid for Rp 85.100',
    date: '21/09/2024',
    time: '18:42',
  },
  {
    type: 'Bill',
    id: '83GASW',
    message: 'Bill #83GASW has been paid for Rp 190.000',
    date: '20/09/2024',
    time: '13:21',
  },
  {
    type: 'Bill',
    id: '71KJAL',
    message: 'Bill #71KJAL has been paid for Rp 38.400',
    date: '18/09/2024',
    time: '10:06',
  },
  {
    type: 'Offer',
    id: '91PWKD',
    message: 'Offer #91PWKD has been placed',
    date: '18/09/2024',
    time: '09:30',
  },
];

const dummySystem = [
  {
    title: "Verification Successful!",
    message:
      "Verification successful! Your account is fully active and can be used",
    date: "01/09/2024",
    time: "13:21",
  },
  {
    title: "Profile update successful!",
    message: "Profile has been updated, check your profile immediately",
    date: "01/09/2024",
    time: "13:21",
  },
  {
    title: "Bank account has been added",
    message: "Bank accounts can now be used as a transfer destination",
    date: "02/08/2024",
    time: "10:56",
  },
];


const segments = ['Transaction', 'System']

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Order': return 'text-green-500';
    case 'Bill': return 'text-yellow-500';
    case 'Offer': return 'text-purple-500';
    default: return 'text-gray-600';
  }
};

const Notification = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/')

  const [type, setType] = useState('Transaction')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Notifications' onBack={handleBack}/>

      <ScrollView
            contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <Search />

        <View className='items-center mt-2'>
          <FilterSwitch segments={segments}/>
        </View>

        <View className='px-5 py-2'>
          {type === 'Transaction' ?
            dummyTransactions.map((notif, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center bg-white rounded-2xl p-3 mb-3 shadow-sm border border-gray-200"
              >
                {/* Left section: Title + message */}
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-rubik-semibold">
                      Incoming{' '}
                      <Text className={`font-rubik ${getTypeColor(notif.type)}`}>
                        {notif.type}
                      </Text>
                    </Text>
              
                    <Text className="font-rubik text-xs text-gray-500 text-right">
                      {notif.date}, {notif.time}
                    </Text>
                  </View>
              
                  <Text className="font-rubik text-xs text-gray-700 mt-1">
                    {notif.message}
                  </Text>
                </View>
              
                {/* Right section: Action button */}
                <View className="ml-3 justify-center items-center">
                  <TouchableOpacity>
                    <Text className="text-green-700 font-rubik-semibold">Cek</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          :
            dummySystem.map((notif, index) => (
              <View
                key={index}
                className="flex-row justify-between items-center bg-white rounded-2xl p-3 mb-3 shadow-sm border border-gray-200"
              >
                <View className="flex-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-rubik-semibold">
                      {notif.title}
                    </Text>
              
                    <Text className="font-rubik text-xs text-gray-500 text-right">
                      {notif.date}, {notif.time}
                    </Text>
                  </View>
              
                  <Text className="font-rubik text-xs text-gray-700 mt-1">
                    {notif.message}
                  </Text>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Notification