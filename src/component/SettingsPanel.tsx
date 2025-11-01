// components/SettingsPanel.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Settings, X, Thermometer, Moon, Sun } from 'lucide-react';
import { RootState } from '../store';
import { setTemperatureUnit } from '../store/weatherSlice';
import { TemperatureUnit } from '../types/weather';

const SettingsPanel: React.FC = () => {
  const dispatch = useDispatch();
  const temperatureUnit = useSelector((state: RootState) => state.weather.temperatureUnit);
  const [isOpen, setIsOpen] = useState(false);

  const handleUnitChange = (unit: TemperatureUnit) => {
    dispatch(setTemperatureUnit(unit));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Temperature Unit */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                    <Thermometer size={20} />
                    <span>Temperature Unit</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleUnitChange('celsius')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        temperatureUnit === 'celsius'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg font-semibold">°C</div>
                      <div className="text-sm text-gray-600">Celsius</div>
                    </button>
                    <button
                      onClick={() => handleUnitChange('fahrenheit')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        temperatureUnit === 'fahrenheit'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-lg font-semibold">°F</div>
                      <div className="text-sm text-gray-600">Fahrenheit</div>
                    </button>
                  </div>
                </div>

                {/* Theme (Placeholder for future implementation) */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
                    <Sun size={20} />
                    <span>Theme</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all opacity-50 cursor-not-allowed">
                      <div className="flex items-center space-x-2 justify-center">
                        <Sun size={16} />
                        <span className="font-medium">Light</span>
                      </div>
                    </button>
                    <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all opacity-50 cursor-not-allowed">
                      <div className="flex items-center space-x-2 justify-center">
                        <Moon size={16} />
                        <span className="font-medium">Dark</span>
                      </div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Coming soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPanel;