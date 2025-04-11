import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import icons from '@/constants/icons'
import { Ionicons } from '@expo/vector-icons'

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
  const [sort, setSort] = useState(true)
  const [sortCol, setSortCol] = useState("name")

  return (
    <ScrollView horizontal>
      <View className="rounded-xl border border-green-700 overflow-hidden bg-white">
        {/* Header */}
        <View className="flex-row bg-green-600">
          {/* <View className="w-10 justify-center items-center p-2">
            <Text className="font-bold">#</Text>
          </View> */}
          {columns.map((col, colIndex) => (
            <View
              key={col.key}
              className={`p-2 justify-center flex-row items-center${colIndex !== 0 ? 'border-l  border-green-700' : ''}`}
              style={{ width: col.width || 100 }}
            >
              <Text className="font-bold text-sm text-center text-white">{col.label}</Text>
              <TouchableOpacity onPress={() => setSort(!sort)}>
                <Ionicons name={sort ? 'chevron-down' : 'chevron-up'} size={16} color="white"/>
              </TouchableOpacity>
            </View>
          ))}
          <View className="w-10 p-2 border-l border-green-700" />
        </View>

        {/* Rows */}
        {data.map((item, index) => (
          <View
            key={index}
            className={`flex-row ${index % 2 === 0 ? 'bg-green-50': 'bg-white'}`}
          >
            {/* <View className="w-10 justify-center items-center p-2">
              <Text className="text-sm">{index + 1}.</Text>
            </View> */}
            {columns.map((col, colIndex) => (
              <View
                key={col.key}
                className={`p-2 justify-center ${colIndex !== 0 ? 'border-l border-green-700' : ''}`}
                style={{ width: col.width || 100 }}
              >
                {col.render
                  ? col.render(item[col.key], item)
                  : 
                    <Text
                      className="text-xs"
                      style={{
                        flexShrink: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      {item[col.key]}
                    </Text>
                }
              </View>
            ))}
            <View className="w-10 justify-center items-center p-2 border-l border-green-700">
              <TouchableOpacity>
                <Ionicons name='ellipsis-vertical' size={16}/>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

export default GenericTable
