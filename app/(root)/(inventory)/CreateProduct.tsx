import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/shared/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FormField from '@/components/shared/FormField';
import ImageUploader from '@/components/shared/ImageUploader';
import MultiSelectDropdown from '@/components/shared/MultiSelectDropdown';
import { databases, config, getBusinessCategories } from '@/lib/appwrite';
import { ID } from 'react-native-appwrite';
import { useGlobalContext } from '@/context/GlobalContext';

const CreateProduct = () => {
  const insets = useSafeAreaInsets();
  const { businessId } = useGlobalContext();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Pcs');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [sku, setSku] = useState('');
  const [active, setActive] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const [imageUri, setImageUri] = useState<string | undefined>();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!businessId) return;
      const businessCategories = await getBusinessCategories({ businessId });
      const options = businessCategories.map((cat) => ({ label: cat.name, value: cat.id }));
      setCategoryOptions(options);
    };
    fetchCategories();
  }, [businessId]);

  const handleCreate = async () => {
    try {
      await databases.createDocument(
        config.databaseId!,
        config.productsCollectionId!,
        ID.unique(),
        {
          name,
          price: parseInt(price),
          unit,
          stock: parseInt(stock),
          description,
          sku,
          active,
          categories,
          business: businessId,
          image: imageUri ?? '',
        }
      );

      Alert.alert('Product Created', `${name} has been added.`);
      router.push('/Inventory');
    } catch (error) {
      console.error('Error creating product:', error);
      Alert.alert('Error', 'Failed to create product.');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Create Product" white />
      <ScrollView
        className="px-5 py-2"
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 90 }}
      >
        <FormField label="Product Image">
          {() => <ImageUploader onImageSelected={(uri) => setImageUri(uri)} />}
        </FormField>

        <FormField label="Product Status" enableSwitch switchValue={active} onSwitchChange={setActive}>
          {(enabled) => (
            <Text className={`font-rubik ${enabled ? 'text-green-700' : 'text-red-700'}`}>{
              enabled ? 'Active' : 'Inactive'
            }</Text>
          )}
        </FormField>

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

        <FormField label="Stock" required>
          {() => (
            <TextInput
              placeholder="Enter stock..."
              keyboardType="numeric"
              value={stock}
              onChangeText={setStock}
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>

        <FormField label="Categories" required>
          {() => (
            <MultiSelectDropdown
              data={categoryOptions}
              selected={categories}
              onChange={setCategories}
            />
          )}
        </FormField>

        <FormField label="Description">
          {() => (
            <TextInput
              placeholder="Enter a description..."
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
              className="border rounded-md px-3 py-3 text-sm font-rubik h-24"
              multiline
            />
          )}
        </FormField>

        <FormField label="SKU">
          {() => (
            <TextInput
              placeholder="Enter SKU..."
              value={sku}
              onChangeText={setSku}
              className="border rounded-md px-3 py-3 text-sm font-rubik"
            />
          )}
        </FormField>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border border-primary-200 p-2">
        <View className="flex flex-col items-center">
          <View className="px-5 py-2 w-full">
            <TouchableOpacity
              className="items-center justify-center bg-green-600 rounded-lg shadow-md shadow-zinc-400 py-2"
              onPress={handleCreate}
            >
              <Text className="text-white text-lg text-center font-rubik-bold mt-1">Save Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreateProduct;
