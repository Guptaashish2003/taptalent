// components/charts/WindChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ForecastData } from '../../types/weather';
import { formatTime, getWindDirection } from '../../utils/weatherUtils';

interface WindChartProps {
  forecast: ForecastData;
}

interface WindData {
  time: string;
  speed: number;
  direction: number;
  directionSymbol: string;
  gust?: number;
}

const WindChart: React.FC<WindChartProps> = ({ forecast }) => {
  const data: WindData[] = forecast.list.slice(0, 8).map(item => ({
    time: formatTime(item.dt),
    speed: item.wind.speed,
    direction: item.wind.deg,
    directionSymbol: getWindDirection(item.wind.deg),
    gust: item.wind.gust,
  }));

  // Custom tooltip for wind data
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{`Time: ${label}`}</p>
          <p className="text-sm text-blue-600">
            Speed: <strong>{data.speed} m/s</strong>
          </p>
          <p className="text-sm text-purple-600">
            Direction: <strong>{data.direction}° ({data.directionSymbol})</strong>
          </p>
          {data.gust && (
            <p className="text-sm text-red-600">
              Gust: <strong>{data.gust} m/s</strong>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Wind Speed Chart */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Wind Speed</h3>
        <ResponsiveContainer width="100%" height={200}>
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
              tickFormatter={(value) => `${value} m/s`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="speed" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#1d4ed8' }}
              name="Wind Speed"
            />
            {data.some(d => d.gust) && (
              <Line 
                type="monotone" 
                dataKey="gust" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                name="Wind Gust"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Wind Direction Compass */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Wind Direction</h3>
        <div className="flex justify-center">
          <div className="relative w-48 h-48">
            {/* Compass Circle */}
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            
            {/* Compass Directions */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">N</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-600">S</div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600">W</div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600">E</div>
            
            {/* Wind Direction Arrow */}
            {data[0] && (
              <div
                className="absolute top-1/2 left-1/2 w-1 bg-blue-600 rounded-full transform origin-bottom"
                style={{
                  height: '45%',
                  transform: `translate(-50%, -100%) rotate(${data[0].direction}deg)`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-blue-600"></div>
              </div>
            )}
            
            {/* Center Point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white"></div>
            
            {/* Current Direction Info */}
            {data[0] && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-center">
                <div className="text-lg font-bold text-gray-900">{data[0].direction}°</div>
                <div className="text-sm text-gray-600">{data[0].directionSymbol}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wind Speed Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {Math.max(...data.map(d => d.speed))} m/s
          </div>
          <div className="text-sm text-gray-600">Max Speed</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {(data.reduce((sum, d) => sum + d.speed, 0) / data.length).toFixed(1)} m/s
          </div>
          <div className="text-sm text-gray-600">Average Speed</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {data[0]?.directionSymbol}
          </div>
          <div className="text-sm text-gray-600">Current Direction</div>
        </div>
      </div>
    </div>
  );
};

export default WindChart;