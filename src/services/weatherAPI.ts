// services/weatherAPI.ts
import axios from 'axios';
import { WeatherData, ForecastData, City } from '../types/weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const weatherAPI = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    const cacheKey = `weather-${lat}-${lon}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Use Current Weather Data API 2.5 (free tier)
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      });

      const transformedData: WeatherData = {
        id: response.data.id,
        name: response.data.name,
        sys: {
          country: response.data.sys.country,
        },
        main: {
          temp: response.data.main.temp,
          feels_like: response.data.main.feels_like,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
        },
        weather: response.data.weather,
        wind: {
          speed: response.data.wind.speed,
          deg: response.data.wind.deg,
          gust: response.data.wind.gust,
        },
        visibility: response.data.visibility,
        dt: response.data.dt,
      };

      cache.set(cacheKey, { data: transformedData, timestamp: Date.now() });
      return transformedData;
    } catch (error) {
      console.error('Current weather fetch error:', error);
      throw error;
    }
  },

  async getForecast(lat: number, lon: number): Promise<ForecastData> {
    const cacheKey = `forecast-${lat}-${lon}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Use 5 Day / 3 Hour Forecast API 2.5 (free tier)
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          units: 'metric',
          appid: API_KEY,
        },
      });

      const transformedData: ForecastData = {
        list: response.data.list.map((item: any) => ({
          dt: item.dt,
          main: {
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            humidity: item.main.humidity,
            pressure: item.main.pressure,
          },
          weather: item.weather,
          wind: {
            speed: item.wind.speed,
            deg: item.wind.deg,
            gust: item.wind.gust,
          },
          pop: item.pop || 0,
          dt_txt: item.dt_txt,
        })),
        city: {
          name: response.data.city.name,
          country: response.data.city.country,
        },
      };

      cache.set(cacheKey, { data: transformedData, timestamp: Date.now() });
      return transformedData;
    } catch (error) {
      console.error('Forecast fetch error:', error);
      throw error;
    }
  },

  async searchCities(query: string): Promise<City[]> {
    if (!query.trim()) return [];
    
    try {
      // Use Geocoding API for city search (free tier)
      const response = await axios.get(`${GEO_URL}/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY,
        },
      });
      
      return response.data.map((city: any) => ({
        id: 0,
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      }));
    } catch (error) {
      console.error('City search error:', error);
      return [];
    }
  },
};