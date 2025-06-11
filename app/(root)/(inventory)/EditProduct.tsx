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
import ImageUploader from "@/components/shared/ImageUploader";
import { config, databases, getProductById, getBusinessCategories } from "@/lib/appwrite";
import MultiSelectDropdown from "@/components/shared/MultiSelectDropdown";
import { useGlobalContext } from "@/context/GlobalContext";

const EditProduct = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const {businessId} = useGlobalContext()

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Pcs');
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);
  const [imageUri, setImageUri] = useState<string | undefined>();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      const product = await getProductById(id);
      setProductToEdit(product);
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!businessId) return;
      const businessCategories = await getBusinessCategories({ businessId });

      const options = businessCategories.map((cat) => ({
        label: cat.name,
        value: cat.id,
      }));

      setCategoryOptions(options);
    };

    fetchOptions();
  }, [businessId]);

  useEffect(() => {
    if (
      productToEdit &&
      Array.isArray(productToEdit.categories) &&
      productToEdit.categories.length > 0
    ) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setUnit(productToEdit.unit);
      setStock(productToEdit.stock.toString());
      setSku(productToEdit.sku || '');
      const categoryIds = productToEdit.categories.map((cat: any) =>
        typeof cat === 'string' ? cat : cat.$id
      );
      setCategories(categoryIds);
      setDescription(productToEdit.description || '');
      setActive(productToEdit.active);
      if (typeof productToEdit.image === 'object' && productToEdit.image) {
        setImageUri(productToEdit.image);
      }
      // console.log("IDs: ", categoryIds, "Categories: ", categories)
    }
  }, [productToEdit]);

  const handleSave = async () => {
    if (!productToEdit) return;

    const updatedProduct: Product = {
      ...productToEdit,
      name,
      price: parseInt(price),
      unit,
      stock: parseInt(stock),
      sku,
      categories,
      description,
      active,
      image: imageUri ? imageUri : undefined,
    };

    await databases.updateDocument(
      config.databaseId!,
      config.productsCollectionId!,
      productToEdit.id,
      {
        name,
        price: parseInt(price),
        unit,
        stock: parseInt(stock),
        sku,
        categories,
        description,
        active,
        image: imageUri ?? productToEdit.image
      }
    );

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
            <ImageUploader onImageSelected={(uri) => setImageUri(uri)} productImage={productToEdit.image} />
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

        <FormField label="Categories">
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
          <TextInput value={description} onChangeText={setDescription} multiline className="border rounded-md px-3 py-3 text-sm font-rubik h-24 text-start" />
          )}
        </FormField>

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
