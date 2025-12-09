import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import RecommendationCard from '../components/RecommendationCard';

export default function ResultScreen({ route, navigation }) {
  const { systems, formData } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recommended System Designs</Text>
      {systems.map((sys, index) => (
        <RecommendationCard key={index} data={sys} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});
