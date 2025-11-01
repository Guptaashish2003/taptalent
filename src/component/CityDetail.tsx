// components/CityDetail.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { RootState } from '../store';
import { fetchWeatherByCity } from '../store/weatherSlice';
import { City } from '../types/weather';
import TemperatureChart from './charts/TempratureChart';
import PrecipitationChart from './charts/PrecipitationChart';
import WindChart from './charts/WindChart';

const CityDetail: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentWeather, forecasts, temperatureUnit, loading } = useSelector(
    (state: RootState) => state.weather
  );

  const weather = cityId ? currentWeather[cityId] : undefined;
  const forecast = cityId ? forecasts[cityId] : undefined;

  useEffect(() => {
    if (cityId && !weather) {
      // Extract city name and country from cityId format "City-Country"
      const [name, country] = cityId.split('-');
      const city: City = {
        id: 0,
        name,
        country,
        lat: 0,
        lon: 0,
      };
      dispatch(fetchWeatherByCity(city) as any);
    }
  }, [cityId, weather, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!weather || !forecast) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">City not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {weather.name}, {weather.sys.country}
            </h1>
            <p className="text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900">
              {Math.round(weather.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
            </div>
            <div className="text-gray-600">
              Feels like {Math.round(weather.main.feels_like)}°
            </div>
          </div>
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto space-y-8"
      >
        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Clock size={20} />
            <span>24-Hour Temperature Forecast</span>
          </h2>
          <TemperatureChart forecast={forecast} unit={temperatureUnit} />
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Calendar size={20} />
            <span>5-Day Precipitation Forecast</span>
          </h2>
          <PrecipitationChart forecast={forecast} />
        </section>

        <section className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Wind Conditions</h2>
          <WindChart forecast={forecast} />
        </section>
      </motion.div>
    </div>
  );
};

export default CityDetail;
