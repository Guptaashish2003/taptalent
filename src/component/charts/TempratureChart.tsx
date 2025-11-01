// components/charts/TemperatureChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ForecastData, TemperatureUnit } from '../../types/weather';
import { convertTemperature, formatTime } from '../../utils/weatherUtils';

interface TemperatureChartProps {
  forecast: ForecastData;
  unit: TemperatureUnit;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ forecast, unit }) => {
  const data = forecast.list.slice(0, 8).map(item => ({
    time: formatTime(item.dt),
    temperature: convertTemperature(item.main.temp, unit),
    feelsLike: convertTemperature(item.main.feels_like, unit),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="time" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
          tickFormatter={(value) => `${Math.round(value)}°`}
        />
        <Tooltip 
          formatter={(value: number) => [`${Math.round(value)}°`, 'Temperature']}
          labelFormatter={(label) => `Time: ${label}`}
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#3b82f6" 
          strokeWidth={3}
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#1d4ed8' }}
        />
        <Line 
          type="monotone" 
          dataKey="feelsLike" 
          stroke="#8b5cf6" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;