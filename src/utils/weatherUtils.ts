// utils/weatherUtils.ts
import { TemperatureUnit } from '../types/weather';

export const convertTemperature = (temp: number, unit: TemperatureUnit): number => {
  if (unit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  return temp;
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getWindDescription = (speed: number): string => {
  if (speed < 0.5) return 'Calm';
  if (speed < 1.5) return 'Light air';
  if (speed < 3.3) return 'Light breeze';
  if (speed < 5.5) return 'Gentle breeze';
  if (speed < 7.9) return 'Moderate breeze';
  if (speed < 10.7) return 'Fresh breeze';
  if (speed < 13.8) return 'Strong breeze';
  if (speed < 17.1) return 'Moderate gale';
  if (speed < 20.7) return 'Fresh gale';
  if (speed < 24.4) return 'Strong gale';
  if (speed < 28.4) return 'Whole gale';
  if (speed < 32.6) return 'Storm';
  return 'Hurricane';
};

export const getPrecipitationDescription = (probability: number): string => {
  if (probability < 0.1) return 'No precipitation';
  if (probability < 0.3) return 'Slight chance';
  if (probability < 0.6) return 'Chance';
  if (probability < 0.8) return 'Likely';
  return 'High probability';
};