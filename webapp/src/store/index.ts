import { create } from 'zustand';
import { type ICityInfo, type ICurrentWeather } from '../schemas';

// State interface for weather app
interface IWeatherAppState {
    // Currently selected cities
    cities: Array<ICityInfo>;
    // Actions
    addCity: (city: ICityInfo) => void;
    removeCity: (place_id: string) => void;
    addWeather: (weatherInfo: ICurrentWeather, place_id: string) => void;
}

// Zustand store for weather app state management
export const useWeatherStore = create<IWeatherAppState>((set) => ({
    // Initial state
    cities: [],
    // Actions
    addCity: (city: ICityInfo) => set((state) => ({ cities: [...state.cities, city] })),
    removeCity: (place_id: string) => set((state) => ({ cities: state.cities.filter((c) => c.place_id !== place_id) })),
    addWeather: (weatherInfo: ICurrentWeather, place_id: string) =>
        set((state) => ({
            cities: state.cities.map((city) => (city.place_id === place_id ? { ...city, weather: weatherInfo } : city)),
        })),
}));
