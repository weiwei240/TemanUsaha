import { View, Text, ScrollView, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GenericTable from '@/components/shared/GenericTable'
import Search from '@/components/shared/Search'
import { Column } from '@/components/shared/GenericTable'
import { categories } from '@/data/dummy'

interface ItemCategory {
  name: string;
  image: ImageSourcePropType
  itemCount: number;
  dateModified: string;
}

const categoryColumns: Column<ItemCategory>[] = [
  {
    key: 'name',
    label: 'Product',
    sortable: true,
    width: 180,
    render: (item) => (
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Image source={item.image} style={{ width: 36, height: 36, borderRadius: 4, marginRight: 8 }} />
        <Text numberOfLines={3} style={{ fontSize: 12, flexWrap: 'wrap', flex: 1 }}>{item.name}</Text>
      </View>
    ),
  },
  { key: 'itemCount', label: 'Items', sortable: true, width: 90 },
  { key: 'dateModified', label: 'Date Modified', sortable: true, width: 120 },
];

const Category = () => {
  const insets = useSafeAreaInsets()
  const handleCreateCategory = () => router.push('/')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Category' onAdd={handleCreateCategory} white />
      <ScrollView
            contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
          <Search />
          <View className='px-5 py-2'>
            <GenericTable<ItemCategory> itemData={categories} columns={categoryColumns} />
          </View>
      </ScrollView>
      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
        <View className='flex flex-col items-center'>
          <View className='px-5 py-2 w-full'>
            <TouchableOpacity className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'>
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Change Position</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Category