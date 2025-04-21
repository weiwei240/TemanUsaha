import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FormField from '@/components/shared/FormField'
import ImageUploader from '@/components/shared/ImageUploader'
import VariantCard from '@/components/screens/VariantCard'

const CreateProduct = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Create Product' onBack={handleBack} white />
      <ScrollView
        className="px-5 py-2"
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Product Image */}
        <FormField label="Product Image">
          {() => (
            <View>
              <ImageUploader />
              <Text className="text-xs text-gray-500 mt-1">Image size must less than 10MB</Text>
            </View>
          )}
        </FormField>

        {/* Product Status */}
        <FormField label="Product Status" enableSwitch>
          {(enabled) =>
            enabled ?
              <View className='flex-row gap-1'>
                <Ionicons name='checkmark-circle' color='green' size={24}/>
                <Text className='font-rubik'>Active</Text>
              </View>
            :
            <View className='flex-row gap-1'>
              <Ionicons name='close-circle' color='red' size={24}/>
              <Text className='font-rubik'>Inactive</Text>
            </View>
          }
        </FormField>

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
              className="flex-row items-center border rounded-md px-3 justify-between gap-2"
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
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-sm text-gray-600 font-rubik">Pcs</Text>
                <Ionicons name='chevron-down-outline' size={16} color="gray" />
              </TouchableOpacity>
            </View>
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
        <FormField label="SKU" enableSwitch>
          {(enabled) => (
            <TextInput
              editable={enabled}
              placeholder="Enter SKU..."
              className={`border rounded-md px-3 py-3 text-sm font-rubik ${!enabled ? 'bg-gray-200' : ''}`}
            />
          )}
        </FormField>

        {/* Variant */}
        <FormField label="Variant" enableSwitch>
          {(enabled) => (
            <View className='items-center'>
              {enabled ?
                [1, 2, 3].map((variant, i) => (
                  <VariantCard key={i}/>
                ))
              :
                <View></View>   
              }
              {enabled ?
                <TouchableOpacity className='bg-green-500 rounded-md p-2 flex-row'>
                  <Text className='text-center font-rubik text-white mr-2'>Add Variant</Text>
                  <Ionicons name='add-circle' color='white' size={24}/>
                </TouchableOpacity>
              :
                <View></View>
              }
            </View>
          )}
        </FormField>
      </ScrollView>
      <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2'>
        <View className='flex flex-col items-center'>
          <View className='px-5 py-2 w-full'>
            <TouchableOpacity
              className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2'
              onPress={() => handleBack()}
            >
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Save Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CreateProduct
