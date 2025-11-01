// components/charts/PrecipitationChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ForecastData } from '../../types/weather';
import { formatDate } from '../../utils/weatherUtils';

interface PrecipitationChartProps {
  forecast: ForecastData;
}

const PrecipitationChart: React.FC<PrecipitationChartProps> = ({ forecast }) => {
  // Group forecast by day and calculate max precipitation probability
  const dailyData = forecast.list.reduce((acc: any[], item) => {
    const date = new Date(item.dt * 1000).toDateString();
    const existingDay = acc.find(d => d.date === date);
    
    if (existingDay) {
      if (item.pop > existingDay.precipitation) {
        existingDay.precipitation = item.pop;
      }
    } else {
      acc.push({
        date,
        formattedDate: formatDate(item.dt),
        precipitation: item.pop,
        fullDate: new Date(item.dt * 1000),
      });
    }
    
    return acc;
  }, []).slice(0, 5); // Next 5 days

  const getBarColor = (precipitation: number) => {
    if (precipitation < 0.3) return '#60a5fa'; // Light blue for low chance
    if (precipitation < 0.6) return '#3b82f6'; // Medium blue for medium chance
    return '#1d4ed8'; // Dark blue for high chance
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={dailyData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="formattedDate" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
          tickFormatter={(value) => `${Math.round(value * 100)}%`}
        />
        <Tooltip 
          formatter={(value: number) => [`${Math.round(value * 100)}%`, 'Precipitation Chance']}
          labelFormatter={(label, payload) => {
            if (payload && payload[0]) {
              return payload[0].payload.fullDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            }
            return label;
          }}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Bar 
          dataKey="precipitation" 
          name="Precipitation Chance"
          radius={[4, 4, 0, 0]}
        >
          {dailyData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={getBarColor(entry.precipitation)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PrecipitationChart;