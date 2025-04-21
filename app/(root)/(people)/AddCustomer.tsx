import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import FormField from '@/components/shared/FormField'

const CreateProduct = () => {
  const insets = useSafeAreaInsets()
  const handleBack = () => router.push('/Inventory')

  return (
    <View className='flex-1 bg-white'>
      <Header title='Add Customer' onBack={handleBack} white />
      <ScrollView
        className="px-5 py-2"
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >

        {/* Customer Name */}
        <FormField label="Full Name" required>
          {() => (
            <TextInput
              placeholder="Enter full name..."
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>

        {/* Email Address */}
        <FormField label="Email Address">
          {() => (
            <TextInput
              placeholder="Enter email address..."
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>

        {/* Phone Number */}
        <FormField label="Phone Number" required>
          {() => (
            <TextInput
              placeholder="Enter phone number..."
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>

        {/* Home Address */}
        <FormField label="Full Name">
          {() => (
            <TextInput
              placeholder="Enter home address..."
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
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
              <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CreateProduct
