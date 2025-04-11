import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FormField from '@/components/FormField'
import ImageUploader from '@/components/ImageUploader'
import VariantCard from '@/components/VariantCard'

const CreateProduct = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Create Product' back={handleBack} />
      <ScrollView
        className="px-5 py-2"
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Product Name */}
        <FormField label="Product Name" required>
          {() => (
            <TextInput
              placeholder="Enter product name..."
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>

        {/* Selling Price */}
        <FormField label="Selling Price" required>
          {() => (
            <View
              className="flex-row items-center border rounded-md px-3 justify-between"
            >
              <Text className="text-gray-500 font-rubik text-sm">Rp</Text>
              <TextInput
                placeholder="0.00"
                keyboardType="numeric"
                className="flex-1 px-2 text-sm text-gray-800 font-rubik"
              />
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-sm text-gray-600 font-rubik">IDR</Text>
                <Ionicons name='chevron-down-outline' size={16} color="gray" />
              </TouchableOpacity>
            </View>
          )}
        </FormField>

        {/* Category */}
        <FormField label="Category" required>
          {() => (
            <View className="flex-col justify-center items-end opacity-100">
              <TouchableOpacity
                className="flex-1 flex-row items-center w-full justify-between border rounded-md px-3 py-3"
              >
                <Text className="text-sm text-gray-800 font-rubik">Uncategorized</Text>
                <Ionicons name='chevron-down-outline' size={16} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity className="ml-2">
                <Text className="text-sm text-indigo-500 font-rubik-semibold">Edit Category</Text>
              </TouchableOpacity>
            </View>
          )}
        </FormField>

        {/* Selling Unit */}
        <FormField label="Selling Unit" required>
          {() => (
            <TouchableOpacity
              className="flex-row items-center justify-between border rounded-md px-3 py-3"
            >
              <Text className="text-sm text-gray-500 font-rubik">Select unit...</Text>
              <Ionicons name='chevron-down-outline' size={16} color="gray" />
            </TouchableOpacity>
          )}
        </FormField>

        {/* Description */}
        <FormField label="Description">
          {() => (
            <TextInput
              placeholder="Enter a description..."
              className="border rounded-md px-3 py-3 text-sm font-rubik h-48"
              textAlignVertical='top'
              multiline
            />
          )}
        </FormField>

        {/* SKU */}
        <FormField label="SKU" required enableSwitch>
          {(enabled) => (
            <TextInput
              editable={enabled}
              placeholder="Enter SKU..."
              className={`border rounded-md px-3 py-3 text-sm font-rubik ${!enabled ? 'bg-gray-200' : ''}`}
            />
          )}
        </FormField>

        {/* Stock */}
        <FormField label="Stock" required enableSwitch>
          {(enabled) => (
            <TextInput
              editable={enabled}
              placeholder="Enter stock.."
              className={`border rounded-md px-3 py-3 text-sm font-rubik ${!enabled ? 'bg-gray-200' : ''}`}
              keyboardType='numeric'
            />
          )}
        </FormField>

        {/* Product Status */}
        <FormField label="Product Status" enableSwitch>
          {(enabled) => <Text className='font-rubik'>{enabled ? 'Active' : 'Inactive'}</Text>}
        </FormField>

        {/* Product Image */}
        <FormField label="Product Image">
          {() => (
            <View>
              <ImageUploader />
              <Text className="text-xs text-gray-500 mt-1">Image size must less than 10MB</Text>
            </View>
          )}
        </FormField>

        {/* Variant */}
        <FormField label="Variant" enableSwitch>
          {(enabled) => <VariantCard />}
        </FormField>

      </ScrollView>
    </View>
  )
}

export default CreateProduct
