import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Sun, Battery } from 'lucide-react-native';
import React, { useRef } from 'react';




export default function Header() {
  return (
    <View style={{
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', marginRight: 8 }}>
          <Sun size={28} color="#13b77c" />
          <Battery size={28} color="#13b77c" style={{ marginLeft: 6 }} />
        </View>
          <Text style={{ fontSize: 23, fontWeight: '600', color: '#111' }}>MySolarPal</Text>
      </View>
    </View>
  );
}
