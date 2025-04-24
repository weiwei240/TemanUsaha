import { View, Text, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props{
  label: string;
  required?: boolean;
  info?: boolean;
  enableSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  children: (enabled: boolean) => React.ReactNode;
}

const FormField = ({
  label,
  required,
  info = true,
  enableSwitch,
  switchValue = true,
  onSwitchChange,
  children,
}: Props) => {

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center">
          {required && <Text className="text-red-500 mr-1">*</Text>}
          <Text className="text-sm font-medium text-gray-700">{label}</Text>
        </View>
        <View className='flex-row items-center'>
          {enableSwitch && (
            <Switch
              value={switchValue}
              onValueChange={onSwitchChange}
              thumbColor={switchValue ? "#15803d" : "#727272"}
              trackColor={{ false: "#fff", true: "#d1fae5" }}
            />
          )}
          {info && 
            <TouchableOpacity>
              <Ionicons name='help-circle-outline' size={18} color="gray"/>
            </TouchableOpacity>
          }
        </View>
      </View>
      {children(switchValue)}
    </View>
  );
};


export default FormField