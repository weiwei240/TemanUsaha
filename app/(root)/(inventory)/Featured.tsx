import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GenericTable from '@/components/GenericTable'
import images from '@/constants/images'

const featuredColumns = [
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
  { key: 'price', label: 'Price', width: 100 },
  { key: 'stock', label: 'Stock', width: 60 },
  { key: 'sold', label: 'Sold', width: 60 },
]

const featuredData = [
  {
    name: 'Non-Stick Pan',
    image: images.pan,
    price: 'Rp 90.000',
    stock: 20,
    sold: 90,
  },
  {
    name: 'Egg',
    image: images.egg,
    price: 'Rp 22.000',
    stock: 30,
    sold: 100,
  },
]


const Featured = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
    >
        <Header title='Featured' back={handleBack}/>

        <GenericTable columns={featuredColumns} data={featuredData}/>
    </ScrollView>
  )
}

export default Featured