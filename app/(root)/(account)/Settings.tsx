import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '@/constants/images'
import { Ionicons } from '@expo/vector-icons'
import OptionItem from '@/components/screens/OptionItem'
import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalContext'

const Settings = () => {
  const insets = useSafeAreaInsets()
  const { business, loading, refetchUser } = useGlobalContext()

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetchUser();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <Header title='Settings' white/>
      
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <View className='px-5 py-2'>
          {/* Profile */}
          <View className='bg-green-600 rounded-xl flex-1 flex-col p-4 mt-1 mb-4 shadow-md'>
            <View className='flex-row justify-between'>
              <Image
                source={business?.avatar ? {uri: business.avatar} : images.avatar}
                className="size-24 rounded-full border-2 border-white"
              />
              <View className='flex-col p-2 w-7/12'>
                {loading ? (
                  <Text className="text-lg text-white font-rubik-semibold">Loading...</Text>
                ) : business ? (
                  <Text className='text-lg text-white font-rubik-semibold'>{business.name}</Text>
                ) : (
                  <Text className="text-lg text-white font-rubik-semibold">Business not found</Text>
                )}
                <Text className='text-xs text-gray-200 font-rubik'>Restaurant</Text>
                <View className='flex-row'>
                  <Ionicons name='call' color='white' size={16}/>
                  {loading ? (
                    <Text className="text-sm text-white font-rubik">Loading...</Text>
                  ) : business ? (
                    <Text className='text-sm text-white font-rubik'>{business.phone}</Text>
                  ) : (
                    <Text className="text-sm text-white font-rubik">Business not found</Text>
                  )}
                </View>
                <View className='flex-row'>
                  <Ionicons name='location' color='white' size={16}/>
                  {loading ? (
                    <Text className="text-sm text-white font-rubik">Loading...</Text>
                  ) : business ? (
                    <Text className='text-sm text-white font-rubik'>{business.address}</Text>
                  ) : (
                    <Text className="text-sm text-white font-rubik">Business not found</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name='pencil' color='white' size={24}/>
              </TouchableOpacity>
            </View>
            <View className='flex-row justify-between mt-2'>
              <TouchableOpacity className='flex-row bg-green-600 rounded-xl p-2 items-center justify-center'>
                <Text className='mx-1 text-white font-rubik-semibold text-sm'>Switch Business</Text>
                <Ionicons name='chevron-down' color='white' size={24}/>
              </TouchableOpacity>
              <TouchableOpacity className='flex-row bg-white rounded-xl p-2 items-center justify-center'>
                <Ionicons name='add-circle' color='green' size={24}/>
                <Text className='mx-2 text-green-600 font-rubik-semibold text-sm'>New Business</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Options - Business */}
          <View className='py-2'>
            <Text className='text-xl font-rubik-semibold'>Business Account</Text>
            <View className='bg-green-50 rounded-xl border my-2 shadow-md'>
              <OptionItem icon='briefcase' text='Business Profile' route='/'/>
              <OptionItem icon='card' text='Bank Account' route='/'/>
              <OptionItem icon='document-text' text='Business Activity' route='/'/>
              <OptionItem icon='language' text='Change Language' route='/'/>
              <OptionItem icon='notifications' text='Notification' route='/'/>
              <OptionItem icon='accessibility' text='Accessibility' route='/'/>
              <OptionItem icon='key' text='Security' route='/'/>
            </View>
          </View>

          {/* Options - General */}
          <View className='py-2'>
            <Text className='text-xl font-rubik-semibold'>General</Text>
            <View className='bg-green-50 rounded-xl border my-2 shadow-md'>
              <OptionItem icon='people' text='Help Centre' route='/'/>
              <OptionItem icon='lock-closed' text='Privacy Policy' route='/'/>
              <OptionItem icon='chatbox' text='Feedback' route='/'/>
            </View>
          </View>

          {/* Sign Out */}
          <TouchableOpacity className='bg-red-200 shadow-md rounded-xl flex-row justify-center items-center p-2 m-4' onPress={handleLogout}>
            <Ionicons name='log-out' color='#ef4444' size={24}/>
            <Text className='font-rubik-bold text-red-500'>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    
  )
}

export default Settings