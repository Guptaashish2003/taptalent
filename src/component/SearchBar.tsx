// components/SearchBar.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Search, X, MapPin, Star } from 'lucide-react';
import { debounce } from 'lodash';
import { weatherAPI } from '../services/weatherAPI';
import { City, FavoriteCity } from '../types/weather';
import { addFavorite } from '../store/weatherSlice';

interface SearchBarProps {
  onClose: () => void;
  onCitySelect: (city: City) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose, onCitySelect }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Properly memoized debounced function (no lint warning)
  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([]);
          return;
        }

        setLoading(true);
        try {
          const cities = await weatherAPI.searchCities(searchQuery);
          setResults(cities);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 300),
    []
  );

  // ✅ Effect runs when query changes
  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleAddFavorite = (city: City) => {
    const favoriteCity: FavoriteCity = { ...city, isFavorite: true };
    dispatch(addFavorite(favoriteCity));
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 pt-20"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center space-x-4 p-6 border-b border-gray-200">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            className="flex-1 text-lg outline-none placeholder-gray-500"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              results.map((city, index) => (
                <motion.div
                  key={`${city.id}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div
                    className="flex items-center space-x-3 flex-1"
                    onClick={() => onCitySelect(city)}
                  >
                    <MapPin size={20} className="text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.country}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddFavorite(city)}
                    className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
                    title="Add to favorites"
                  >
                    <Star size={20} className="text-gray-400 hover:text-yellow-400" />
                  </button>
                </motion.div>
              ))
            ) : query ? (
              <div className="p-8 text-center text-gray-500">
                No cities found for "{query}"
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
