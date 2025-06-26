import Search from './components/Search';
import { useWeatherStore } from './store';
import { useState } from 'react';
import type { ICityInfo } from './schemas';
import CitiesList from './components/CitiesList';
import WeatherInfo from './components/WeatherInfo';
import { CloudAlert } from 'lucide-react';

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

// fallback UI for error boundary just in case if App crashes
export function AppFallback() {
    return (
        <main className="weather-app min-h-screen flex flex-col items-center justify-center bg-indigo-400 px-4 py-6 w-full">
            <div className="container w-full max-w-xs sm:max-w-xl">
                <header className="app-header text-center mb-8 pt-8 w-full">
                    <h1 className="app-title text-4xl sm:text-5xl font-bold text-white mb-2">Weather App</h1>
                    <p className="app-subtitle text-gray-100 text-sm sm:text-lg">
                        Get real-time weather information for any city
                    </p>
                </header>
                <section className="weather-main-card flex justify-center items-center flex-col bg-white/20 rounded shadow p-6 w-full ">
                    <CloudAlert className="h-20 w-20 text-red-400 " />
                    <h3 className="text-xl my-2 ">Oops! Something went wrong.</h3>
                    <p className="text-zinc-300">Please, relaoad the page.</p>
                </section>
            </div>
        </main>
    );
}
