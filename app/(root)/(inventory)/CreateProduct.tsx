import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/shared/Header'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import FormField from '@/components/shared/FormField'
import ImageUploader from '@/components/shared/ImageUploader'
import VariantCard from '@/components/screens/VariantCard'
import { Product } from '@/types/types'
import { products } from '@/data/dummy'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import images from '@/constants/images'

const CreateProduct = () => {
  const insets = useSafeAreaInsets()
  const handleCategory = () => router.push('/Category')

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Pcs');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [active, setActive] = useState(true);
  const [category, setCategory] = useState('Uncategorized');
  const [imageUri, setImageUri] = useState<string | undefined>();

  const [stockForm, setStockForm] = useState(true);
  const [skuForm, setSkuForm] = useState(true);
  const [variantForm, setVariantForm] = useState(true);

  const handleCreate = () => {
    const newProduct: Product = {
      id: uuidv4(),
      name,
      price: parseInt(price),
      unit: 'Pcs',
      stock: parseInt(stock),
      sold: 0,
      active,
      category: 'Uncategorized',
      description,
      sku,
      // image: imageUri ? { uri: imageUri } : undefined,
      image: images.avatar,
    }
    products.push(newProduct)
    Alert.alert('Product Saved', `${name} has been added to ${category}`);
    router.push('/Inventory');
  }

  return (
    <View className='flex-1 bg-white'>
      <Header title='Create Product' white />
      <ScrollView
        className="px-5 py-2"
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        {/* Product Image */}
        <FormField label="Product Image">
          {() => (
            <View>
              <ImageUploader onImageSelected={(uri) => setImageUri(uri)}/>
              <Text className="text-xs text-gray-500 mt-1">Image size must less than 10MB</Text>
            </View>
          )}
        </FormField>

        {/* Product Status */}
        <FormField label="Product Status" enableSwitch switchValue={active} onSwitchChange={setActive}>
          {(switchValue) => (
              <Text className={`font-rubik ${switchValue ? 'text-green-700' : 'text-red-700'}`} >
                {switchValue ? 'Active' : 'Inactive'}
              </Text>
          )}
        </FormField>

        {/* Product Name */}
        <FormField label="Product Name" required>
          {() => (
            <TextInput
              placeholder="Enter product name..."
              value={name}
              onChangeText={setName}
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
                value={price}
                onChangeText={setPrice}
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
        <FormField label="Stock" required enableSwitch switchValue={stockForm} onSwitchChange={setStockForm}>
          {(switchValue) => (
            <TextInput
              editable={switchValue}
              placeholder="Enter stock.."
              keyboardType='numeric'
              value={stock}
              onChangeText={setStock}
              className={`border rounded-md px-3 py-3 text-sm font-rubik ${!switchValue ? 'bg-gray-200' : ''}`}
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
              <TouchableOpacity className="ml-2" onPress={handleCategory}>
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
              textAlignVertical='top'
              value={description}
              onChangeText={setDescription}
              className="border rounded-md px-3 py-3 text-sm font-rubik h-48"
              multiline
            />
          )}
        </FormField>

        {/* SKU */}
        <FormField label="SKU" enableSwitch switchValue={skuForm} onSwitchChange={setSkuForm}>
          {(switchValue) => (
            <TextInput
              editable={switchValue}
              value={sku}
              onChangeText={setSku}
              placeholder="Enter SKU..."
              className={`border rounded-md px-3 py-3 text-sm font-rubik ${!switchValue ? 'bg-gray-200' : ''}`}
            />
          )}
        </FormField>

        {/* Variant */}
        <FormField label="Variant" enableSwitch switchValue={variantForm} onSwitchChange={setVariantForm}>
          {(switchValue) => (
            <View className='items-center'>
              {switchValue ?
                [1, 2, 3].map((variant, i) => (
                  <VariantCard key={i}/>
                ))
              :
                <View></View>   
              }
              {switchValue ?
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
              onPress={handleCreate}
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
