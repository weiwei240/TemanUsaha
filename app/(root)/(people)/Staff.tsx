import { View, FlatList } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import Search from '@/components/shared/Search'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EmployeeCard from '@/components/screens/EmployeeCard'
import { employees } from '@/data/dummy'

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