import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { FilterSwitch } from '@/components/Filter'
import Search from '@/components/Search'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EmployeeCard from '@/components/EmployeeCard'
import images from '@/constants/images'

export const employees = [
  {
    id: '1',
    name: 'Brock S',
    phone: '084511907710',
    role: 'Staff',
    shiftTime: '15.00 - 21.00',
    image: images.avatar,
  },
  {
    id: '2',
    name: 'Alice M',
    phone: '083244112300',
    role: 'Manager',
    shiftTime: '09.00 - 17.00',
    image: images.avatar,
  },
  {
    id: '3',
    name: 'Derek J',
    phone: '082109832451',
    role: 'Staff',
    shiftTime: '12.00 - 18.00',
    image: images.avatar,
  },
  {
    id: '4',
    name: 'Nina R',
    phone: '085678543211',
    role: 'Cashier',
    shiftTime: '14.00 - 20.00',
    image: images.avatar,
  },
  {
    id: '5',
    name: 'Leo T',
    phone: '081345672398',
    role: 'Security',
    shiftTime: '21.00 - 03.00',
    image: images.avatar,
  },
];


const Staff = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/')
  const handleAddStaff = () => router.push('/')

  return (
    <View className='flex-1 bg-white' style={{ paddingTop: insets.top + 80, paddingBottom: 90 }}>
      <Header title='Staff' onBack={handleBack} onAdd={handleAddStaff}/>
      <Search />
      <View className='px-5 py-2'>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <EmployeeCard employee={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
      </View>
    </View>
  )
}

export default Staff