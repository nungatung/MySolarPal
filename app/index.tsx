import  Header from '../components/ui/Header';  
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import RNPickerSelect from 'react-native-picker-select';
import AdditionalInformation from '@/components/ui/AdditionalInformation';
import Footer from '@/components/ui/Footer';


const steps = ['Building Type and Region', 'Component Details', 'Results'];



export default function App() {
  const router = useRouter();

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [region, setRegion] = useState('');
  const [buildingType, setBuildingType] = useState('Residential Home');
  const [country, setCountry] = useState(''); 

  useEffect(() => {
    Font.loadAsync({
      'Outfit': require('./assets/fonts/Outfit-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  // Define Sunlight hours based on region selected
  const getSunlightHours = {
    auckland: 4.2,
    wellington: 3.4,
    christchurch: 4,
    cape_town: 4.9,
    durban: 4.9,
    johannesburg: 5.5,
  };

const handleContinue = () => {
  const sunlight_hours = getSunlightHours[region] || 4.0; // default fallback
  router.push({
    pathname: '/design/step1',
    params: {
      region,
      sunlight_hours: sunlight_hours.toString(),
      country, // Pass the selected country
    },
  });
};

  



  return (
  
<ScrollView style={{ flex: 1, backgroundColor: '#7fd3ab' }}>
      <Header />

      <View style={{ paddingTop: 80, alignItems: 'center' }}> 
        {/* Title + Subtitle */}
        <Text style={{
          fontSize: 22,
          fontFamily: 'Outfit',
          color: '#444',
          marginTop: 12,
          marginBottom: 25,
          textAlign: 'center',
          paddingHorizontal: 24,
        }}>
          Enter your details below to get personalized solar system recommendations
          based on<br/>your energy needs and location.
        </Text>

        {/* White Card Container */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          marginTop: 32,
          width: '92%',
          paddingVertical: 60,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,

        }}>


          {/* Stepper */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
            {steps.map((label, idx) => (
              <View key={idx} style={{ alignItems: 'center', flex: 1 }}>
                <View style={{
                  backgroundColor: '#13b77c',
                  width: 34,
                  height: 34,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>{idx + 1}</Text>
                </View>
                <Text style={{ fontSize: 16, marginTop: 6, textAlign: 'center', fontFamily: 'Outfit' }}>{label}</Text>
              </View>
            ))}
          </View>

          {/* building Type */}
          <Text style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: '600', color: '#4B5563', marginBottom: 8 }}>
            Building Type
          </Text>

          <View style={{
            backgroundColor: '#c8ecd9',
            paddingVertical: 14,
            paddingHorizontal: 12,
            borderRadius: 6,
            marginBottom: 16
          }}>
            <Text style={{ fontSize: 16, fontWeight: '500', fontFamily:'Outfit', color: '#065f46'}}>Residential Home</Text>
          </View>


          {/* Country Dropdown */}
                    <Text style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: '600', color: '#4B5563', marginBottom: 8 }}>
            Country
          </Text>
          <View style={{
            backgroundColor: '#c8ecd9',
            borderRadius: 6,
            marginBottom: 16,
            paddingHorizontal: 10,
            paddingVertical: 14,
            justifyContent: 'center',
          }}>
            <RNPickerSelect
              onValueChange={setCountry}
              value={country}
              placeholder={{ label: 'Select Country', value: null }}
              items={[
                { label: 'New Zealand', value: 'new zealand' },
                { label: 'South Africa', value: 'south africa' },
              ]}
              useNativeAndroidPickerStyle={false}
              style={{
                inputIOS: {
                  fontFamily: 'Outfit',
                  backgroundColor: '#86d6a9',
                  color: '#0f3d2f',
                  fontSize: 16,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                },
                inputAndroid: {
                  fontFamily: 'Outfit',
                  backgroundColor: '#86d6a9',
                  color: '#0f3d2f',
                  fontSize: 16,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                },
                inputWeb: {
                  fontFamily: 'Outfit',
                  backgroundColor: '#86d6a9',
                  color: '#0f3d2f',
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                  borderColor: '#86d6a9',
                  cursor: 'pointer',
                },
                iconContainer: {
                  top: 18,
                  right: 12,
                },
                placeholder: {
                  color: '#0f3d2f',
                },
              }}
            />
          </View>

          
          
          {/* Region Dropdown */}
          <Text style={{ fontFamily: 'Outfit', fontSize: 16, fontWeight: '600', color: '#4B5563', marginBottom: 6 }}>Region</Text>

          <View style={{
            backgroundColor: '#c8ecd9',
            borderRadius: 6,
            marginBottom: 24,
            paddingHorizontal: 10,
            paddingVertical: 14, 
            justifyContent: 'center',
          
          }}>
            
            <RNPickerSelect
  onValueChange={(value) => setRegion(value)}
  value={region}
  placeholder={{ label: 'Select Your Region', value: null }}
  items={[
    { label: 'Auckland', value: 'auckland' },
    { label: 'Wellington', value: 'wellington' },
    { label: 'Canterbury', value: 'canterbury' },
    { label: 'Otago', value: 'otago' },
    { label: 'Cape Town', value: 'cape_town' },
    { label: 'Johannesburg', value: 'johannesburg' },
    { label: 'Durban', value: 'durban' },
    { label: 'Pretoria', value: 'pretoria' },
    { label: 'Port Elizabeth', value: 'port_elizabeth' },
  ]}
  useNativeAndroidPickerStyle={false}
  style={{
    inputIOS: {
      fontFamily: 'Outfit',
      backgroundColor: '#86d6a9',
      color: '#0f3d2f',
      fontSize: 16,
      paddingVertical: 14,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    
    inputAndroid: {
      fontFamily: 'Outfit',
      backgroundColor: '#86d6a9',
      color: '#0f3d2f',
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 6,
    },
    
    inputWeb: {
      fontFamily: 'Outfit',
      backgroundColor: '#86d6a9',
      color: '#065f46',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 6,
      borderColor: '#86d6a9',
      cursor: 'pointer',
      
      
    },
    iconContainer: {
      top: 18,
      right: 12,
    },
    placeholder: {
      color: '#0f3d2f',
    },
  }}
/>

          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!region || !country}
            style={{
              backgroundColor: '#13b77c',
              paddingVertical: 14,
              paddingHorizontal: 24,
              borderRadius: 6,
              alignSelf: 'flex-end',
            }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Continue →</Text>
          </TouchableOpacity>

          

        </View>
        
      </View>
      <AdditionalInformation />
      <Footer />  
    </ScrollView> 
  
  );
}
