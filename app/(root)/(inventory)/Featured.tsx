import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import GenericTable from '@/components/GenericTable'
import images from '@/constants/images'
import Search from '@/components/Search'
import FilterDropdown from '@/components/Filter'
import { Column } from '@/components/GenericTable'

// const featuredColumns = [
//   {
//     key: 'name',
//     label: 'Name',
//     width: 160,
//     render: (_: any, row: any) => (
//       <View className="flex-row items-center gap-2">
//         <Image source={row.image} className="w-12 h-12 rounded-sm mr-2" />
//         <Text
//           className="text-xs"
//           style={{
//             flexShrink: 1,
//             flexWrap: 'wrap',
//           }}
//           numberOfLines={0}
//         >
//           {row.name}
//         </Text>
//       </View>
//     ),
//   },
//   { key: 'price', label: 'Price', width: 80 },
//   { key: 'stock', label: 'Stock', width: 60 },
//   { key: 'sold', label: 'Sold', width: 60 },
// ]

interface ItemFeatured {
  name: string;
  price: string;
  stock: number;
  sold: number;
}

const featuredColumns: Column<ItemFeatured>[] = [
  { key: 'name', label: 'Product', sortable: true },
  { key: 'price', label: 'Price', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true },
  { key: 'sold', label: 'Sold', sortable: true },
] as const

const featuredData = [
  {
    name: 'Non-Stick Pan',
    image: images.pan,
    price: 'Rp 90.000',
    stock: 2,
    sold: 90,
  },
  {
    name: 'Egg',
    image: images.egg,
    price: 'Rp 22.000',
    stock: 30,
    sold: 100,
  },
  {
    name: 'Test',
    image: images.newYork,
    price: 'Rp 56.000',
    stock: 15,
    sold: 70,
  },
  {
    name: 'Abcde',
    image: images.avatar,
    price: 'Rp 12.000',
    stock: 10,
    sold: 50,
  },
]

const segments = ["All Categories", "Sort By", "Status"];

const Featured = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Featured' back={handleBack}/>
      <ScrollView
            contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <Search />
        <FilterDropdown segments={segments}/>

        <View className='px-5 py-2'>
          <GenericTable<ItemFeatured> itemData={featuredData} columns={featuredColumns} />
        </View>
      </ScrollView>
    </View>
  )
}

export default Featured