import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function Step2() {
  const params = useLocalSearchParams();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prepare data for backend
    const payload = {
      panel_wattage: Number(params.panel_wattage),
      sunlight_hours: Number(params.sunlight_hours),
      inverter_type: params.inverter_type,
      battery_capacity: Number(params.battery_capacity),
      pv_system_size: Number(params.system_size), // in Watts
      daily_load: Number(params.monthly_usage) / 30,
      derate_factor: 0.8,
      back_up_days: Number(params.back_up_days) || 1, // Default to 1 if not provided
      country: params.country,
      depth_of_discharge: 0.8,
      efficiency: 0.9,
      number_of_batteries: 1, // Default to 1 battery if not provided
    };

    axios.post("http://127.0.0.1:8000/utils/calculate_solar_design", payload)
      .then(res => {
        setResult(res.data.result || res.data);
      })
      .catch(err => {
        Alert.alert("Error", "Failed to fetch results from backend.");
      })
      .finally(() => setLoading(false));
  }, [params]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3fdf6" }}>
        <ActivityIndicator size="large" color="#13b77c" />
        <Text style={{ marginTop: 16 }}>Calculating your solar system...</Text>
      </View>
    );
  }

  if (!result) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3fdf6" }}>
        <Text style={{ color: "#e11d48" }}>No results available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f3fdf6", padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", color: "#13b77c", marginBottom: 16 }}>
        Your Solar System Design Results
      </Text>

      <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 24, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#222", marginBottom: 8 }}>
          System Summary
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Panel Wattage:</Text> {params.panel_wattage} W
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Sunlight Hours:</Text> {params.sunlight_hours} hrs/day
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Inverter Type:</Text> {params.inverter_type === "grid_tied" ? "Grid Tied" : "Hybrid"}
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Battery Capacity(1 Battery):</Text> {params.battery_capacity} kWh
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Estimated Daily Usage:</Text> {(Number(params.monthly_usage) / 30).toFixed(2)} kWh
        </Text>
      </View>

      <View style={{ backgroundColor: "#d1fae5", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#065f46", marginBottom: 8 }}>
          Calculated System Details
        </Text>
        <Text style={{ fontSize: 16, color: "#065f46", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>PV System Size:</Text> {result.pv_system_size ? result.pv_system_size.toFixed(2) : "-"} kW
        </Text>
        <Text style={{ fontSize: 16, color: "#065f46", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Recommended Battery Size:</Text> {result.battery_size ? result.battery_size.toFixed(2) : "-"} kWh
        </Text>
        <Text style={{ fontSize: 16, color: "#065f46", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Annual Energy Production:</Text> {result.annual_energy_production ? result.annual_energy_production.toFixed(0) : "-"} kWh
        </Text>
      </View>

      <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#222", marginBottom: 8 }}>
          Environmental Impact
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Annual CO₂ Reduction:</Text> {result.yearly_co2_reduction ? result.yearly_co2_reduction.toFixed(0) : "-"} kg
        </Text>
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 4 }}>
          <Text style={{ fontWeight: "bold" }}>Lifetime CO₂ Reduction (25 yrs):</Text> {result.lifetime_co2_reduction ? result.lifetime_co2_reduction.toFixed(0) : "-"} kg
        </Text>
      </View>
    </ScrollView>
  );
}