import React from 'react';
import { View, Text } from 'react-native';
import { Lightbulb, Info } from 'lucide-react-native';

export default function AdditionalInformation() {
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 24,
      marginBottom: 32,
      marginTop: 24,
    }}>
      {/* How It Works Card */}
      <View style={{
        backgroundColor: '#d1fae5',
        borderRadius: 12,
        padding: 20,
        flex: 1,
        minWidth: 320,
        maxWidth: 420,
        margin: 8,
        borderWidth: 1,
        borderColor: '#7fd3ab',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Lightbulb color="#13b77c" size={22} style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#111' }}>How It Works</Text>
        </View>
        {/* Steps */}
        {[{
          title: 'Enter Your Location',
          desc: 'We gather solar irradiance data and your country\'s emissions factor based on your input.',
        }, {
          title: 'Input Your Energy Usage',
          desc: 'Provide your monthly electricity consumption in kilowatt-hours (kWh) to help us design appropriate systems.',
        }, {
          title: 'Review Results',
          desc: "We’ll do the math for you! From your details we'll design a solar system tailored to your needs.",
        }].map((step, idx) => (
          <View key={idx} style={{ flexDirection: 'row', marginBottom: 16 }}>
            <View style={{
              height: 32, width: 32, borderRadius: 16,
              backgroundColor: '#13b77c', alignItems: 'center', justifyContent: 'center',
              marginRight: 12,
            }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{idx + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#111', fontSize: 16 }}>{step.title}</Text>
              <Text style={{ color: '#444', fontSize: 14, marginTop: 2 }}>{step.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Key Solar Terms Card */}
      <View style={{
        backgroundColor: '#d1fae5',
        borderRadius: 12,
        padding: 20,
        flex: 1,
        minWidth: 320,
        maxWidth: 420,
        margin: 8,
        borderWidth: 1,
        borderColor: '#7fd3ab',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Info color="#13b77c" size={22} style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#111' }}>Key Solar Terms Explained</Text>
        </View>
        {[
          {
            title: 'kWh (Kilowatt Hour)',
            desc: 'A unit of energy equal to the power of 1,000 watts operating for one hour. This is how your electricity usage is measured.',
          },
          {
            title: 'Solar Irradiance (Sunlight Hours)',
            desc: 'The average amount of sunlight a location receives each day, expressed as hours of peak sun. More sunlight hours mean greater potential solar energy production.',
          },
          {
            title: 'System Size (kW)',
            desc: 'The maximum power output of your solar array, measured in kilowatts. A larger system produces more electricity.',
          },
          {
            title: "Back Up Days",
            desc: "The number of days your system can sustain you without sunlight or during a power cut.",
          },
          {
            title: "Environmental Impact",
            desc: "The positive effects of using solar energy include reduced greenhouse gas emissions, our tool calculates the reduction of CO2 emissions based on your system's specifications."
          }
        ].map((item, idx) => (
          <View key={idx} style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: '600', color: '#111', fontSize: 16 }}>{item.title}</Text>
            <Text style={{ color: '#444', fontSize: 14, marginTop: 2 }}>{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}