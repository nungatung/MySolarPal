import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SolarForm({ onSubmit }) {
  const [kwh, setKwh] = useState('');
  const [roof, setRoof] = useState('');
  const [panelWattage, setPanelWattage] = useState('');
  const [inverter, setInverter] = useState('grid_tied');
  const [batteryType, setBatteryType] = useState('lithium');

  const handleSubmit = () => {
    if (!kwh || !roof || !panelWattage || !batteryType) return alert("Fill all fields.");
    onSubmit({
      kwh_monthly: parseFloat(kwh),
      roof_space: parseFloat(roof),
      panel_wattage: parseFloat(panelWattage),
      inverter_type: inverter,
      battery_type: batteryType,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Monthly Power Usage (kWh)</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 800" value={kwh} onChangeText={setKwh} />

      <Text style={styles.label}>Roof Space (m²)</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 50" value={roof} onChangeText={setRoof} />

      <Text style={styles.label}>Panel Wattage (W)</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 400" value={panelWattage} onChangeText={setPanelWattage} />

      <Text style={styles.label}>Sunlight Hours (per day)</Text> 
      <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 5" value={sunlighthours} onChangeText={setBatteryType} /> 
      
      <Text style={styles.label}>Battery Capacity (kWh)</Text>
      <TextInput style={styles.input} keyboardType="numeric" placeholder="e.g. 10" value={batteryType} onChangeText={setBatteryType} />

      <Text style={styles.label}>Inverter Type</Text>
      <Picker selectedValue={inverter} onValueChange={setInverter} style={styles.picker}>
        <Picker.Item label="Grid Tied" value="grid_tied" />
        <Picker.Item label="Hybrid (with Battery)" value="hybrid" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Generate System Designs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontWeight: '600', marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 5, backgroundColor: '#f9f9f9'
  },
  picker: {
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#00A86B', padding: 14,
    borderRadius: 10, alignItems: 'center', marginTop: 10
  },
  buttonText: { color: '#fff', fontWeight: '700' }
});
