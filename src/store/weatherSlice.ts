// store/weatherSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { WeatherData, ForecastData, City, FavoriteCity, TemperatureUnit } from '../types/weather';
import { weatherAPI } from '../services/weatherAPI';

interface WeatherState {
  currentWeather: Record<string, WeatherData>;
  forecasts: Record<string, ForecastData>;
  favoriteCities: FavoriteCity[];
  temperatureUnit: TemperatureUnit;
  loading: boolean;
  error: string | null;
  lastUpdated: number;
}

const initialState: WeatherState = {
  currentWeather: {},
  forecasts: {},
  favoriteCities: JSON.parse(localStorage.getItem('favoriteCities') || '[]'),
  temperatureUnit: (localStorage.getItem('temperatureUnit') as TemperatureUnit) || 'celsius',
  loading: false,
  error: null,
  lastUpdated: 0,
};

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: City) => {
    const [weather, forecast] = await Promise.all([
      weatherAPI.getCurrentWeather(city.lat, city.lon),
      weatherAPI.getForecast(city.lat, city.lon),
    ]);
    
    // Add city name and country to the weather data
    const weatherWithCity = {
      ...weather,
      name: city.name,
      sys: { country: city.country }
    };
    
    const forecastWithCity = {
      ...forecast,
      city: { name: city.name, country: city.country }
    };
    
    return { 
      weather: weatherWithCity, 
      forecast: forecastWithCity, 
      cityId: `${city.name}-${city.country}` 
    };
  }
);

export const fetchWeatherForFavorites = createAsyncThunk(
  'weather/fetchFavorites',
  async (cities: FavoriteCity[]) => {
    const promises = cities.map(city => 
      weatherAPI.getCurrentWeather(city.lat, city.lon).then(weather => ({
        weather: {
          ...weather,
          name: city.name,
          sys: { country: city.country }
        },
        cityId: `${city.name}-${city.country}`,
      }))
    );
    const results = await Promise.all(promises);
    return results;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<City>) => {
      const favorite: FavoriteCity = { ...action.payload, isFavorite: true };
      state.favoriteCities.push(favorite);
      localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteCities = state.favoriteCities.filter(city => 
        `${city.name}-${city.country}` !== action.payload
      );
      localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
    },
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
      localStorage.setItem('temperatureUnit', action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather[action.payload.cityId] = action.payload.weather;
        state.forecasts[action.payload.cityId] = action.payload.forecast;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(fetchWeatherForFavorites.fulfilled, (state, action) => {
        action.payload.forEach(({ weather, cityId }) => {
          state.currentWeather[cityId] = weather;
        });
        state.lastUpdated = Date.now();
      });
  },
});

export const { addFavorite, removeFavorite, setTemperatureUnit, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;