import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import Header from "@/components/shared/Header";
import FormField from "@/components/shared/FormField";
import { Product } from "@/types/types";
import { products } from "@/data/dummy";
import ImageUploader from "@/components/shared/ImageUploader";

const EditProduct = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const productToEdit = products.find((p) => p.id === id);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);
  const [imageUri, setImageUri] = useState<string | undefined>();

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setUnit(productToEdit.unit);
      setStock(productToEdit.stock.toString());
      setSku(productToEdit.sku || '');
      setCategory(productToEdit.category);
      setDescription(productToEdit.description || '');
      setActive(productToEdit.active);
      // if (typeof productToEdit.image === 'object' && productToEdit.image?.uri) {
      //   setImageUri(productToEdit.image.uri);
      // }
    }
  }, [productToEdit]);

  const handleSave = () => {
    if (!productToEdit) return;

    const updatedProduct: Product = {
      ...productToEdit,
      name,
      price: parseInt(price),
      unit,
      stock: parseInt(stock),
      sku,
      category,
      description,
      active,
      // image: imageUri ? { uri: imageUri } : undefined,
    };

    const index = products.findIndex((p) => p.id === productToEdit.id);
    if (index !== -1) {
      products[index] = updatedProduct;
    }

    Alert.alert("Product Updated", `${name} has been saved.`);
    router.push('/Inventory');
  };

  if (!productToEdit) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Header title="Edit Product" white />
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 80, paddingBottom: 100 }}
        className="px-5 py-2"
      >
        <FormField label="Product Image">
          {() => (
            <ImageUploader onImageSelected={(uri) => setImageUri(uri)} />
          )}
        </FormField>

        <FormField label="Product Status" enableSwitch switchValue={active} onSwitchChange={setActive}>
          {(enabled) => (
            <Text className="font-rubik text-green-700">{enabled ? 'Active' : 'Inactive'}</Text>
          )}
        </FormField>

        <FormField label="Product Name" required>{() => (
          <TextInput value={name} onChangeText={setName} className="border rounded-md px-3 py-3 text-sm font-rubik" />
        )}</FormField>

        <FormField label="Selling Price" required>{() => (
          <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" className="border rounded-md px-3 py-3 text-sm font-rubik" />
        )}</FormField>

        <FormField label="Stock" required enableSwitch switchValue={true} onSwitchChange={() => {}}>
          {() => (
            <TextInput value={stock} onChangeText={setStock} keyboardType="numeric" className="border rounded-md px-3 py-3 text-sm font-rubik" />
          )}
        </FormField>

        <FormField label="Category">{() => (
          <TextInput value={category} onChangeText={setCategory} className="border rounded-md px-3 py-3 text-sm font-rubik" />
        )}</FormField>

        <FormField label="Description">{() => (
          <TextInput value={description} onChangeText={setDescription} multiline className="border rounded-md px-3 py-3 text-sm font-rubik h-24 text-start" />
        )}</FormField>

        <FormField label="SKU" enableSwitch switchValue={true} onSwitchChange={() => {}}>
          {() => (
            <TextInput value={sku} onChangeText={setSku} className="border rounded-md px-3 py-3 text-sm font-rubik" />
          )}
        </FormField>
      </ScrollView>

      <View className="absolute bottom-0 w-full bg-white px-5 pb-6 pt-3 border-t border-gray-200">
        <TouchableOpacity onPress={handleSave} className="bg-green-600 py-3 rounded-lg items-center">
          <Text className="text-white text-lg font-semibold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProduct;
