import React from 'react';
import { View } from 'react-native';
import SolarForm from '../components/SolarForm';
import { getRecommendations } from '../utils/api';

export default function InputScreen({ navigation }) {
  const handleFormSubmit = async (formData) => {
    const res = await getRecommendations(formData);
    navigation.navigate('Result', { systems: res.data.systems, formData });
  };

  return (
    <View>
      <SolarForm onSubmit={handleFormSubmit} />
    </View>
  );
}
