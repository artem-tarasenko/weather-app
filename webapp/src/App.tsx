import Search from './components/Search';
import { useWeatherStore } from './store';
import { useState } from 'react';
import type { ICityInfo } from './schemas';
import CitiesList from './components/CitiesList';
import WeatherInfo from './components/WeatherInfo';

export default function App() {
    const [currentCity, setCurrentCity] = useState<null | ICityInfo>(null);
    const { addCity, removeCity, cities } = useWeatherStore();

    function handleSearchResults(cityInfo: ICityInfo) {
        setCurrentCity(cityInfo);
    }

    function saveCurrentCity() {
        if (!currentCity) return;
        addCity(currentCity);
    }

    function removeCityFromList(cityId: string) {
        removeCity(cityId);
    }

    return (
        <main className="weather-app min-h-screen flex flex-col items-center justify-center bg-indigo-400 p-4 w-full">
            <div className="container w-full max-w-xs sm:max-w-xl">
                <header className="app-header text-center mb-8 pt-8 w-full">
                    <h1 className="app-title text-4xl sm:text-5xl font-bold text-white mb-2">Weather App</h1>
                    <p className="app-subtitle text-gray-100 text-sm sm:text-lg">
                        Get real-time weather information for any city
                    </p>
                </header>
                <Search onSelect={handleSearchResults} />
                <CitiesList cities={cities} onRemoveCity={removeCityFromList} onClickCity={setCurrentCity} />
                <WeatherInfo
                    currentCity={currentCity}
                    onSaveCity={saveCurrentCity}
                    isCitySaved={cities.some((city) => city.place_id === currentCity?.place_id)}
                />
            </div>
        </main>
    );
}
