import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  onBack: () => void;
  onAdd?: () => void;
  white?: boolean;
}

const Header = ({ title, onBack, onAdd, white = false }: Props) => {
  return (
    <View style={[styles.header, white && styles.headerWhite]}>
      <View className='flex-row justify-center items-center gap-2'>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name='chevron-back-outline' color={white ? '#15803d' : 'white'} size={32} />
        </TouchableOpacity>
        <Text className={`text-2xl font-bold ${white ? 'text-green-700' : 'text-white'}`}>
          {title}
        </Text>
      </View>
      {onAdd ? (
        <TouchableOpacity onPress={onAdd}>
          <Ionicons name='add' color={white ? '#15803d' : 'white'} size={32} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} /> // Spacer to keep title centered
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#15803d',
    padding: 16,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // distribute icons and title
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,

    // 💡 iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,

    // 💡 Android Shadow
    elevation: 5,
  },  
  headerWhite: {
    backgroundColor: 'white',
  },
});

export default Header;
