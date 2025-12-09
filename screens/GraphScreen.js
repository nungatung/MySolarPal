import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getProductionGraph } from '../utils/api';

export default function GraphScreen({ route }) {
  const { lat, lon, panels, batteries, inverter_type } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await getProductionGraph({ lat, lon, panels, batteries, inverter_type });
      setData(res.data.monthly_production);
    };
    fetchGraph();
  }, []);

  return (
    <View>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{ data }]
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisSuffix=" kWh"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        }}
        style={{ marginVertical: 8 }}
      />
    </View>
  );
}
