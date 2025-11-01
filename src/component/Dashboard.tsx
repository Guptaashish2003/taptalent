import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RefreshCw, MapPin } from 'lucide-react';
import { RootState } from '../store';
import { fetchWeatherForFavorites, fetchWeatherByCity } from '../store/weatherSlice';
import { City } from '../types/weather';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import SettingsPanel from './SettingsPanel';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ for navigation

  const { favoriteCities, currentWeather, lastUpdated, loading } = useSelector(
    (state: RootState) => state.weather
  );

  const [showSearch, setShowSearch] = useState(false);
  const [, setShowSettings] = useState(false);

  useEffect(() => {
    if (favoriteCities.length > 0) {
      dispatch(fetchWeatherForFavorites(favoriteCities) as any);
    }
  }, [dispatch, favoriteCities.length,favoriteCities]);

  const handleRefresh = () => {
    if (favoriteCities.length > 0) {
      dispatch(fetchWeatherForFavorites(favoriteCities) as any);
    }
  };

  // ✅ Updated: navigate to city detail when a city is selected from SearchBar
  const handleCitySelect = async (city: City) => {
    await dispatch(fetchWeatherByCity(city) as any);
    setShowSearch(false);
    navigate(`/city/${city.name}-${city.country}`);
  };

  const lastUpdatedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString()
    : 'Never';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Weather Analytics</h1>
            <p className="text-gray-600">Real-time weather data and forecasts</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <SettingsPanel />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setShowSearch(true)}
            className="flex-1 max-w-2xl flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-text"
          >
            <Search size={20} className="text-gray-400" />
            <span className="text-gray-500">Search for a city...</span>
          </button>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Last updated: {lastUpdatedTime}
        </div>
      </motion.header>

      {/* Weather Cards Grid */}
      <motion.div
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {favoriteCities.map((city, index) => {
            const cityKey = `${city.name}-${city.country}`;
            return (
              <Link key={cityKey} to={`/city/${cityKey}`}>
                <WeatherCard
                  city={city}
                  weather={currentWeather[cityKey]}
                  index={index}
                />
              </Link>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {favoriteCities.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No cities added
          </h3>
          <p className="text-gray-600 mb-6">
            Search for cities to add them to your dashboard
          </p>
          <button
            onClick={() => setShowSearch(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search Cities
          </button>
        </motion.div>
      )}

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <SearchBar
            onClose={() => setShowSearch(false)}
            onCitySelect={handleCitySelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
