// components/WeatherCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Wind, Droplets, Gauge } from 'lucide-react';
import { RootState } from '../store';
import { removeFavorite } from '../store/weatherSlice';
import { FavoriteCity, WeatherData } from '../types/weather';
import { convertTemperature, getWeatherIcon } from '../utils/weatherUtils';

interface WeatherCardProps {
  city: FavoriteCity;
  weather?: WeatherData;
  index: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, weather, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperatureUnit = useSelector((state: RootState) => state.weather.temperatureUnit);

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFavorite(`${city.name}-${city.country}`));
  };

  const handleCardClick = () => {
    navigate(`/city/${city.name}-${city.country}`);
  };

  if (!weather) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
      >
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-24 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  const temperature = convertTemperature(weather.main.temp, temperatureUnit);
  const feelsLike = convertTemperature(weather.main.feels_like, temperatureUnit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">
            {city.name}, {city.country}
          </h3>
        </div>
        <button
          onClick={handleRemoveFavorite}
          className="p-1 hover:bg-yellow-50 rounded-full transition-colors"
        >
          <Star size={20} className="text-yellow-400 fill-current" />
        </button>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {Math.round(temperature)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
          </div>
          <div className="text-gray-600 text-sm">
            Feels like {Math.round(feelsLike)}°
          </div>
        </div>
        <div className="text-right">
          <img
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
          <div className="text-gray-600 text-sm capitalize">
            {weather.weather[0].description}
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Wind size={16} className="text-gray-400" />
          <span className="text-gray-600">
            {weather.wind.speed} m/s
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets size={16} className="text-gray-400" />
          <span className="text-gray-600">
            {weather.main.humidity}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Gauge size={16} className="text-gray-400" />
          <span className="text-gray-600">
            {weather.main.pressure} hPa
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 text-gray-400">👁</div>
          <span className="text-gray-600">
            {weather.visibility / 1000} km
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;