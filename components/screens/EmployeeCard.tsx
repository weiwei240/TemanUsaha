import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Employee {
  id: string;
  name: string;
  phone: string;
  role: string;
  shiftTime: string;
  image: ImageSourcePropType;
}

interface Props{
  employee: Employee;
}

const EmployeeCard = ({ employee }: Props) => {
  return (
    <View className="bg-green-700 p-4 rounded-3xl overflow-hidden shadow-lg m-2 w-[48%]">
      {/* Shift time */}
      <View className="bg-green-900 py-1">
        <Text className="text-center text-white text-xs font-semibold">
          {employee.shiftTime}
        </Text>
      </View>

      {/* Image */}
      <Image
        source={employee.image}
        className="w-full h-32 object-cover rounded-b-2xl"
        resizeMode="cover"
      />

      {/* Info */}
      <View className="p-2">
        <Text className="text-white font-semibold">{employee.name}</Text>

        <View className="flex-row items-center gap-1">
          <Text className="text-white text-xs">{employee.phone}</Text>
          <Ionicons name='copy' color='white'/>
        </View>

        <View className="bg-green-900 rounded-full px-2 py-1 self-start mt-1">
          <Text className="text-white text-xs">{employee.role}</Text>
        </View>
      </View>
    </View>
  );
};

export default EmployeeCard;
