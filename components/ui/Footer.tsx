import React from 'react';
import { View, Text, Linking, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { Sun, Battery } from 'lucide-react-native';

export default function Footer() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View style={{
      backgroundColor: '#1a1a1a',
      paddingVertical: 32,
      paddingHorizontal: isWide ? 48 : 16,
    }}>
      <View style={{
        flexDirection: isWide ? 'row' : 'column',
        justifyContent: 'space-between',
        gap: 32,
      }}>
        {/* Logo & Contact */}
        <View style={{ flex: 1, marginBottom: isWide ? 0 : 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', marginRight: 8 }}>
              <Sun color="#13b77c" size={24} />
              <Battery color="#13b77c" size={24} style={{ marginLeft: 4 }} />
            </View>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>MySolarPal</Text>
          </View>
          <Text style={{ fontSize: 14, color: '#bdbdbd' }}>
            Contact us:{' '}
            <Text
              style={{ color: '#13b77c', textDecorationLine: Platform.OS === 'web' ? 'underline' : 'none' }}
              onPress={() => Linking.openURL('mailto:MySolarPal@gmail.com')}
            >
              MySolarPal@gmail.com
            </Text>
          </Text>
        </View>

        {/* About Us */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20, marginBottom: 12 }}>About Us</Text>
          <Text style={{ color: '#bdbdbd', fontSize: 15, marginBottom: 8 }}>
            We are proudly New Zealand-owned and operated, dedicated to making solar system design simple, fast, and accessible.
          </Text>
          <Text style={{ color: '#bdbdbd', fontSize: 15, marginBottom: 8 }}>
            Our innovative design tool streamlines the process for homeowners looking to understand their energy needs, determine the right solar setup.
          </Text>
        
        </View>
      </View>

      {/* Divider */}
      <View style={{
        borderTopWidth: 1,
        borderTopColor: '#333',
        marginTop: 28,
        paddingTop: 24,
        flexDirection: isWide ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: isWide ? 'center' : 'flex-start',
        
      }}>
        <Text style={{ color: '#888', fontSize: 13 }}>© 2025 MySolarPal. All rights reserved.</Text>
        <Text style={{ color: '#888', fontSize: 13 }}>Made with <Text style={{ color: '#e25555' }}>❤️</Text> for a greener planet</Text>
      </View>
    </View>
  );
}