import { create } from 'zustand';
import { type ICityInfo } from '../schemas';

// State interface for weather app
interface IWeatherAppState {
    // Currently selected cities
    cities: Array<ICityInfo>;
    // Actions
    addCity: (city: ICityInfo) => void;
    removeCity: (place_id: string) => void;
}

// Zustand store for weather app state management
// has data about fetched city search results and weather
//plus several actions including "add weather"
export const useWeatherStore = create<IWeatherAppState>((set) => ({
    // Initial state
    cities: [],
    // Actions
    addCity: (city: ICityInfo) => set((state) => ({ cities: [...state.cities, city] })),
    removeCity: (place_id: string) => set((state) => ({ cities: state.cities.filter((c) => c.place_id !== place_id) })),
}));
