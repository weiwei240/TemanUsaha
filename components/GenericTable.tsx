import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import icons from '@/constants/icons'

interface ColumnConfig {
  key: string
  label: string
  width?: number
  render?: (value: any, row: any) => React.ReactNode
}

interface Props {
  columns: ColumnConfig[]
  data: any[]
}

const GenericTable = ({ columns, data }: Props) => {
  return (
    <View className="rounded-xl border border-black overflow-hidden bg-white">
      {/* Header */}
      <View className="flex-row bg-black/5 border-b border-black">
        <View className="w-10 justify-center items-center p-2">
          <Text className="font-bold">#</Text>
        </View>
        {columns.map((col) => (
          <View
            key={col.key}
            className="p-2 border-l border-black justify-center"
            style={{ width: col.width || 100 }}
          >
            <Text className="font-bold">{col.label}</Text>
          </View>
        ))}
        <View className="w-10 p-2 border-l border-black" />
      </View>

      {/* Rows */}
      {data.map((item, index) => (
        <View key={index} className="flex-row border-b border-gray-200">
          <View className="w-10 justify-center items-center p-2">
            <Text className="text-sm">{index + 1}.</Text>
          </View>
          {columns.map((col) => (
            <View
              key={col.key}
              className="p-2 justify-center border-l border-black"
              style={{ width: col.width || 100 }}
            >
              {col.render
                ? col.render(item[col.key], item)
                : <Text className="text-sm">{item[col.key]}</Text>}
            </View>
          ))}
          <View className="w-10 justify-center items-center p-2 border-l border-black">
            <Image source={icons.more} className="w-3 h-3" />
          </View>
        </View>
      ))}
    </View>
  )
}

export default GenericTable
