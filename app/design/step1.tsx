import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
 




export default function Step1() {
  const router = useRouter();
  const [monthlyUsage, setMonthlyUsage] = useState("");
  const [panelWattage, setPanelWattage] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [inverterType, setInverterType] = useState("");
  const [backupDays, setBackupDays] = useState(""); // NEW STATE
  const [numberOfBatteries, setNumberOfBatteries] = useState("");

 const params = useLocalSearchParams();
 const [region, setRegion] = useState(params.region || "");
 const [sunlightHours, setSunlightHours] = useState(params.sunlight_hours || "");
 const [country, setCountry] = useState(params.country || "");

const handleContinue = () => {
  const derate_factor = 0.8;
  const daily_load = Number(monthlyUsage) / 30;
  const pv_system_size = daily_load / Number(sunlightHours) * derate_factor; // Calculate system size in Watts
  

  router.push({
    pathname: '/design/step2',
    params: {
      system_size: pv_system_size.toFixed(2),
      panel_wattage: panelWattage,
      battery_capacity: batteryCapacity,
      inverter_type: inverterType,
      region,
      sunlight_hours: sunlightHours,
      monthly_usage: monthlyUsage,
      back_up_days: backupDays,
      country,
      number_of_batteries: numberOfBatteries || 1, // Default to 1 if not provided
    }
  });
};

  return (
    
    <ScrollView style={{ flex: 1, backgroundColor: '#7fd3ab', paddingHorizontal: 16, paddingVertical: 24 }}>


      {/* White Card Container */}
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                marginTop: 35,
                marginLeft: 70,
                width: '92%',
                paddingVertical: 80,
                paddingHorizontal: 80,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
              }}>


      {/* Monthly Power Usage Input */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#4B5563', marginTop: 4, marginBottom: 1 }}>
        Monthly Power Usage (kWh)
      </Text>
      <TextInput
        value={monthlyUsage}
        onChangeText={setMonthlyUsage}
        placeholder="(e.g. 300)"
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ececec' }}
        keyboardType="numeric"
      />

      {/* Panel Wattage Input */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#4B5563', marginTop: 4, marginBottom: 1 }}>
        Panel Wattage (W)
      </Text>
      <TextInput
        value={panelWattage}
        onChangeText={setPanelWattage}
        placeholder="(e.g. 450)"
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ececec' }}
        keyboardType="numeric"
      />

      {/* Battery Capacity Input */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#4B5563', marginTop: 4, marginBottom: 1 }}>
        Battery Capacity (kWh)
      </Text>
      <TextInput
        value={batteryCapacity}
        onChangeText={setBatteryCapacity}
        placeholder="(e.g. 10)"
        style={{
          backgroundColor: inverterType === "grid_tied" ? '#e5e7eb' : '#fff', // greyed out if disabled
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#ececec',
          color: inverterType === "grid_tied" ? '#a3a3a3' : '#111', // grey text if disabled
        }}
        keyboardType="numeric"
        editable={inverterType !== "grid_tied"}
      />

      {/* Backup Days Input */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#4B5563', marginTop: 4, marginBottom: 1 }}>
        Backup Days
      </Text>
      <TextInput
        value={backupDays}
        onChangeText={setBackupDays}
        placeholder="(e.g. 1)"
        style={{ backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#ececec' }}
        keyboardType="numeric"
      />

      {/* Inverter Type Dropdown */}
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#4B5563', marginTop: 4, marginBottom: 1 }}>
        Inverter Type
      </Text>
      <View style={{ backgroundColor: '#34D399', borderRadius: 8, marginBottom: 16 }}>
        <Picker
          selectedValue={inverterType}
          onValueChange={setInverterType}
          style={{ color: '#11181C', padding: 12 }}
        >
          <Picker.Item label="Grid Tied" value="grid_tied" />
          <Picker.Item label="Hybrid (with Battery)" value="hybrid" />
        </Picker>
      </View>

      {/* Continue */}
      <TouchableOpacity
        onPress={handleContinue}
        disabled={!monthlyUsage || !panelWattage || !batteryCapacity || !backupDays || !inverterType}
        style={{ 
                 backgroundColor: '#13b77c', 
                 paddingHorizontal: 24,
                 paddingVertical: 14,
                 borderRadius: 6,
                 alignSelf: 'flex-end'
               }}
      >
        <Text style={{ 
                      color: '#fff', 
                      fontWeight: 'bold', 
                      textAlign: 'center', 
                      fontSize: 15,
                      }}>
                      Continue →
                    </Text>
      </TouchableOpacity>
      
      </View>
    </ScrollView>
  );
}