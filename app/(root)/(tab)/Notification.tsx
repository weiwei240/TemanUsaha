import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Search from '@/components/shared/Search'
import { FilterSwitch } from '@/components/shared/Filter'
import { dummySystem, dummyTransactions } from '@/data/dummy'

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

  const [type, setType] = useState('Transaction')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Notifications'/>

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