import Search from './components/Search';
import { X, Pin } from 'lucide-react';
import { useWeatherStore } from './store';
import { useState } from 'react';
import type { ICityInfo } from './schemas';

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
                {/* todo move to a separate component */}
                <section className="weather-main-card flex justify-center flex-col bg-white/20 rounded shadow p-6 w-full text-center mb-4">
                    <ul>
                        {cities.length > 0 ? (
                            cities.map((city, index) => (
                                <li
                                    key={index}
                                    className="bg-white/20 hover:bg-white/30 duration-100 ease-in-out my-2 pl-4 pr-2 py-1 rounded flex cursor-pointer"
                                    onClick={() => null}
                                >
                                    <p className="justify-between items-center flex grow mr-2">
                                        <span>{city.formatted}</span>
                                        <span>{city.weather.main.temp}&deg; C</span>
                                    </p>
                                    <button
                                        className="py-1 px-2 ml-2 text-sm bg-red-400 hover:bg-red-500 ease-in-out duration-200 rounded"
                                        onClick={() => removeCityFromList(city.place_id)}
                                    >
                                        <X size={12} />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No saved cities...</p>
                        )}
                    </ul>
                </section>
                {/* todo move to a separate component */}
                <section className="weather-main-card flex justify-center flex-col bg-white/20 rounded shadow p-6 w-full text-center relative">
                    {currentCity ? (
                        <>
                            <div className="weather-location-row flex justify-center">
                                <h2 className="weather-location text-white text-xl font-semibold">
                                    {currentCity.weather.name}
                                </h2>
                            </div>
                            <div className="weather-condition-row flex flex-col items-center mb-2">
                                <img
                                    src={`https://openweathermap.org/img/wn/${currentCity.weather.weather[0].icon}@2x.png`}
                                    alt={currentCity.weather.weather[0].main}
                                    className="weather-icon w-16 h-16 mb-1"
                                />
                                <p className="weather-condition text-zinc-200 text-lg" aria-label="Condition">
                                    {currentCity.weather.weather[0].main}
                                </p>
                            </div>
                            <div className="weather-temp-row flex flex-col items-center mb-2">
                                <p className="weather-temp text-zinc-200 text-4xl font-bold" aria-label="Temperature">
                                    {currentCity.weather.main.temp}&deg; C
                                </p>
                                <p className="weather-feelslike text-zinc-200 text-base" aria-label="Feels like">
                                    Feels like: {currentCity.weather.main.feels_like}&deg; C
                                </p>
                            </div>
                            <div className="weather-humidity-row flex flex-wrap justify-center mt-4 w-full max-w-[964px] mx-auto gap-4">
                                <p className="weather-humidity text-zinc-200 text-base" aria-label="Humidity">
                                    Humidity: {currentCity.weather.main.humidity}%
                                </p>
                                <p className="weather-wind text-zinc-200 text-base" aria-label="Wind">
                                    Wind: {currentCity.weather.wind.speed} km/h
                                </p>
                            </div>
                            <div className="weather-save-button absolute z-50 right-5 top-5">
                                <button
                                    className="p-2 bg-blue-600/20 hover:bg-blue-500 disabled:hover:bg-blue-600/20 duration-100 ease-in-out rounded-xl text-sm"
                                    onClick={saveCurrentCity}
                                    disabled={cities.some((city) => city.place_id === currentCity?.place_id)}
                                >
                                    <Pin size={16} className="transform rotate-15" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="italic my-6">Please search a city of select one from saved list...</p>
                    )}
                </section>
            </div>
        </main>
    );
}
