import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FilterSwitch } from '@/components/shared/Filter'
import images from '@/constants/images'
import FormField from '@/components/shared/FormField'
import { Redirect } from 'expo-router'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalContext'

const segments = ["Sign Up", "Log In"]

const SignIn = () => {
  const insets = useSafeAreaInsets()
  const { refetchUser, loading, isLoggedIn } = useGlobalContext()
  
  const handleLogin = async () => {
    const result = await login()
    if(result){
      refetchUser()
    }else{
      Alert.alert('Error', 'failed to login')
    }
  }
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  if (!loading && isLoggedIn) return <Redirect href="/" />

  return (
    <ScrollView
          contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 90 }}
          className='flex-1 bg-white px-12 py-2'
    >
      <View className='items-center m-4'>
        <Image source={images.icon} className='m-4'/>
        <Text className='text-3xl font-rubik-bold mb-4'>TemanUsaha</Text>
        <FilterSwitch segments={segments}/>
      </View>
        {/* Email */}
        <FormField label='Email Address'>
          {() => (
            <TextInput
              placeholder="Enter your email address..."
              value={email}
              onChangeText={setEmail}
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>
        {/* Password */}
        <FormField label='Email Address'>
          {() => (
            <TextInput
              placeholder="Must be at least 8 characters"
              value={password}
              onChangeText={setPassword}
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>
        {/* Confirm Password */}
        <FormField label='Email Address'>
          {() => (
            <TextInput
              placeholder="Repeat your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>
        <TouchableOpacity
          className='items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2 my-4'
        >
          <Text className='text-white text-lg text-center font-rubik-bold mt-1'>Sign Up</Text>
        </TouchableOpacity>
        <View className='items-center my-4'>
          <Text className='text-sm text-gray-500 font-rubik'>Other sign in options</Text>
          <View className='flex-row my-2 gap-2'>
            <TouchableOpacity className='border rounded-full p-2 border-gray-400'>
              <Image source={icons.more} className='size-7'/>
            </TouchableOpacity>
            <TouchableOpacity className='border rounded-full p-2 border-gray-400' onPress={handleLogin}>
              <Image source={icons.google} className='size-7'/>
            </TouchableOpacity>
            <TouchableOpacity className='border rounded-full p-2 border-gray-400'>
              <Image source={icons.more} className='size-7'/>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  )
}

export default SignIn