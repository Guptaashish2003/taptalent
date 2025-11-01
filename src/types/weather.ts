// types/weather.ts
export interface WeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  pop: number;
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface City {
  id: number;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface FavoriteCity extends City {
  isFavorite: boolean;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';