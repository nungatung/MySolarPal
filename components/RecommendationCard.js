import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecommendationCard({ data }) {
  return (
    <View style={styles.card}>
      <Text style={styles.mode}>{data.mode?.toUpperCase()} SYSTEM</Text>
      <Text>🔆 Panels: {data.panels} x {data.panel_wattage}W</Text>
      <Text>☀️ Sunlight Hours: {data.sunlight_hours} hrs/day</Text>
      <Text>🔋 Batteries: {data.batteries} ({data.battery_type})</Text>
      <Text>🔌 Inverter: {data.inverter_type}</Text>
      <Text>📏 Roof Space: {data.roof_space} m²</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  mode: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: '#13b77c'
  }
});
