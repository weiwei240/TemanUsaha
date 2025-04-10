import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import images from '@/constants/images'
import GenericTable from '@/components/GenericTable'

const categoryColumns = [
  {
    key: 'name',
    label: 'Name',
    width: 160,
    render: (_: any, row: any) => (
      <View className="flex-row items-center gap-2">
        <Image source={row.image} className="w-6 h-6 rounded-sm mr-2" />
        <Text className="text-sm">{row.name}</Text>
      </View>
    ),
  },
  { key: 'itemCount', label: 'Items', width: 60 },
  { key: 'dateModified', label: 'Modified', width: 100 },
]

const categoryData = [
  {
    name: 'Kitchen Appliances',
    image: images.kitchen,
    itemCount: 2,
    dateModified: '2 days ago',
  },
  {
    name: 'Daily Necessities',
    image: images.daily,
    itemCount: 2,
    dateModified: '2 days ago',
  },
]

const Category = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
    >
        <Header title='Category' back={handleBack}/>

        <GenericTable columns={categoryColumns} data={categoryData}/>
    </ScrollView>
  )
}

export default Category