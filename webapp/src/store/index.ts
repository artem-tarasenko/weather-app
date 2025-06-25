import { create } from 'zustand';
import type { ICurrentWeather } from '../schemas';

// State interface for weather app
interface IWeatherAppState {
    // Currently selected city or coordinates
    city: Array<string>;
    weather: Array<ICurrentWeather>;
    // Actions
    addCity: (city: string) => void;
    removeCity: (city: string) => void;
    addWeather: (weatherInfo: ICurrentWeather) => void;
    removeWeather: (weatherInfo: ICurrentWeather) => void;
}

// Zustand store for weather app state management
export const useWeatherStore = create<IWeatherAppState>((set) => ({
    // Initial state
    city: [],
    weather: [],
    // Actions
    addCity: (city: string) => set((state) => ({ city: [...state.city, city] })),
    removeCity: (city: string) => set((state) => ({ city: state.city.filter((c) => c !== city) })),
    addWeather: (infoToAdd: ICurrentWeather) => set((state) => ({ weather: [...state.weather, infoToAdd] })),
    removeWeather: (infoToRemove: ICurrentWeather) =>
        set((state) => ({ weather: state.weather.filter((info) => info.id !== infoToRemove.id) })),
}));
