import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ImageUploader from '../shared/ImageUploader'

interface Props {
  variantName?: string
  price?: number
  // onEdit: () => void
  // onDelete: () => void
  // onImagePress?: () => void
}

const VariantCard = ({ 
  variantName = 'Variant', 
  price = 0, 
  // onEdit, 
  // onDelete, 
  // onImagePress 
}: Props) => {
  return (
    <View className="flex-row items-center justify-start bg-white border rounded-xl p-1 mb-2 shadow-sm gap-3">
      {/* ImageUploader */}
      <View className='ml-2'>
        <ImageUploader />
      </View>

      {/* Info */}
      <View className='flex-col flex-1'>
        <View className="flex-1">
          <Text className="font-semibold text-black">{variantName}</Text>
          <Text className="text-gray-500 text-sm">Rp {price}</Text>
        </View>

        {/* Buttons */}
        <View className="flex-row items-center justify-end gap-2 mr-2 mb-2">
          <TouchableOpacity 
            // onPress={onEdit} 
            className="bg-yellow-400 px-3 py-1.5 rounded-md flex-row items-center"
          >
            <Text className="text-black font-semibold text-sm mr-1">Edit</Text>
            <Ionicons name="pencil" size={16} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
            // onPress={onDelete} 
            className="bg-red-500 px-3 py-1.5 rounded-md flex-row items-center"
          >
            <Text className="text-white font-semibold text-sm mr-1">Delete</Text>
            <Ionicons name="trash" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default VariantCard
