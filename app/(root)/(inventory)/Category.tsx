import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import images from '@/constants/images'
import GenericTable from '@/components/GenericTable'
import Search from '@/components/Search'

const categoryColumns = [
  {
    key: 'name',
    label: 'Name',
    width: 180,
    render: (_: any, row: any) => (
      <View className="flex-row items-center gap-2">
        <Image source={row.image} className="w-12 h-12 rounded-sm mr-2" />
        <Text
          className="text-xs"
          style={{
            flexShrink: 1,
            flexWrap: 'wrap',
          }}
          numberOfLines={0}
        >
          {row.name}
        </Text>
      </View>
    ),
    
  },
  { key: 'itemCount', label: 'Items', width: 60 },
  { key: 'dateModified', label: 'Modified', width: 100 },
]

const categoryData = [
  {
    name: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
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
    <View className='flex-1 bg-white'>
      <Header title='Category' back={handleBack}/>
      <ScrollView
            contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
          <Search />
          <View className='px-5 py-2'>
            <GenericTable columns={categoryColumns} data={categoryData}/>
          </View>
      </ScrollView>
    </View>
  )
}

export default Category