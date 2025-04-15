import { View, Text, ScrollView, Image, ImageSourcePropType, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GenericTable from '@/components/GenericTable'
import images from '@/constants/images'
import Search from '@/components/Search'
import FilterDropdown from '@/components/Filter'
import { Column } from '@/components/GenericTable'
import { formatCurrency } from '@/utils/format'

interface ItemFeatured {
  name: string;
  image: ImageSourcePropType
  price: number;
  stock: number;
  sold: number;
}

const featuredColumns: Column<ItemFeatured>[] = [
  {
    key: 'name',
    label: 'Product',
    sortable: true,
    width: 180,
    render: (item) => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={item.image} style={{ width: 36, height: 36, borderRadius: 4, marginRight: 8 }} />
        <Text numberOfLines={3} style={{ fontSize: 12, flexWrap: 'wrap', flex: 1 }}>{item.name}</Text>
      </View>
    ),
  },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    width: 120,
    render: (item) => (
      <Text style={{ fontSize: 12, color: '#1f2937' }}>
        {formatCurrency(item.price)}
      </Text>
    ),
  },
  { key: 'stock', label: 'Stock', sortable: true, width: 60 },
  { key: 'sold', label: 'Sold', sortable: true, width: 60 },
];

const featuredData = [
  {
    name: 'Non-Stick Pan',
    image: images.pan,
    price: 90000,
    stock: 2,
    sold: 90,
  },
  {
    name: 'Egg',
    image: images.egg,
    price: 22000,
    stock: 30,
    sold: 100,
  },
  {
    name: 'Test',
    image: images.newYork,
    price: 56000,
    stock: 15,
    sold: 70,
  },
  {
    name: 'Abcde',
    image: images.avatar,
    price: 12000,
    stock: 10,
    sold: 50,
  },
]

const segments = ["All Categories", "Sort By", "Status"];

const Featured = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')
  const handleCreateFeatured = () => router.push('/')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Featured' onBack={handleBack} onAdd={handleCreateFeatured} white />
      <ScrollView
            contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <Search />
        <FilterDropdown segments={segments}/>

        <View className='px-5 py-2'>
          <GenericTable<ItemFeatured> itemData={featuredData} columns={featuredColumns} />
        </View>
      </ScrollView>
      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
        <View className='flex flex-col items-center'>
          <View className='px-5 py-2 w-full'>
            <TouchableOpacity
              className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
              onPress={() => handleBack()}
            >
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Change Position</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Featured