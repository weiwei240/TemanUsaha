import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  back: () => void;
}

const Header = ({ title, back }: Props) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={back}>
        <Ionicons name='chevron-back-outline' color="white" size={32} />
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold">
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#15803d', // Tailwind green-700
    padding: 16,
    paddingTop: 50, // Add spacing for status bar
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export default Header;
