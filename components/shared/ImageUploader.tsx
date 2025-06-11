import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const MAX_IMAGE_SIZE = 10000 * 1024; // 10MB

interface Props{
  onImageSelected: (uri: string) => void
  productImage?: string | null
}

const ImageUploader = ({ onImageSelected, productImage = null }: Props) => {
  const [imageUri, setImageUri] = useState<string | null>(productImage);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera roll permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const fileSize = result.assets[0].base64?.length || 0;
      if (fileSize > MAX_IMAGE_SIZE * 1.37) { // Base64 = ~37% size increase
        Alert.alert('Image Too Large', 'Please upload an image under 100KB.');
        return;
      }
      const uri = result.assets[0].uri
      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  return (
    <View className="items-start my-2">
      <TouchableOpacity
        onPress={pickImage}
        className="w-20 h-20 rounded-md border border-dashed border-gray-400 items-center justify-center"
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-full h-full rounded-md" resizeMode="cover" />
        ) : (
          <Ionicons name="add" size={24} color="gray" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploader;
