import Search from './components/Search';
import { currentWeather } from './msw/mockData';
import { X } from 'lucide-react';
import { useWeatherStore } from './store';

export default function App() {
    const store = useWeatherStore();

    const weatherData = currentWeather;
    const citiesList = [currentWeather, currentWeather, currentWeather];

    return (
        <main className="weather-app min-h-screen flex flex-col items-center justify-center bg-indigo-400 p-4 w-full">
            <div className="container w-full max-w-xs sm:max-w-xl">
                <header className="app-header text-center mb-8 pt-8 w-full">
                    <h1 className="app-title text-4xl sm:text-5xl font-bold text-white mb-2">Weather App</h1>
                    <p className="app-subtitle text-gray-100 text-sm sm:text-lg">
                        Get real-time weather information for any city
                    </p>
                </header>
                <Search />
                {/* todo move to a separate component */}
                <section className="weather-main-card flex justify-center flex-col bg-white/20 rounded shadow p-6 w-full text-center mb-4">
                    <ul>
                        {citiesList.map((city, index) => (
                            <li
                                key={index}
                                className="bg-white/20 hover:bg-white/30 duration-100 ease-in-out my-2 pl-4 pr-2 py-1 rounded flex cursor-pointer"
                                onClick={() => null}
                            >
                                <p className="justify-between items-center flex grow mr-2">
                                    <span>{city.name}</span>
                                    <span>{city.main.temp}&deg; C</span>
                                </p>
                                <button className="py-1 px-2 ml-2 text-sm bg-red-400 hover:bg-red-500 ease-in-out duration-200 rounded">
                                    <X size={12} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                {/* todo move to a separate component */}
                <section className="weather-main-card flex justify-center flex-col bg-white/20 rounded shadow p-6 w-full text-center">
                    <div className="weather-location-row flex justify-center">
                        <h2 className="weather-location text-white text-xl font-semibold">{weatherData.name}</h2>
                    </div>
                    <div className="weather-condition-row flex flex-col items-center mb-2">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].main}
                            className="weather-icon w-16 h-16 mb-1"
                        />
                        <p className="weather-condition text-zinc-200 text-lg" aria-label="Condition">
                            {weatherData.weather[0].main}
                        </p>
                    </div>
                    <div className="weather-temp-row flex flex-col items-center mb-2">
                        <p className="weather-temp text-zinc-200 text-4xl font-bold" aria-label="Temperature">
                            {weatherData.main.temp}&deg; C
                        </p>
                        <p className="weather-feelslike text-zinc-200 text-base" aria-label="Feels like">
                            Feels like: {weatherData.main.feels_like}&deg; C
                        </p>
                    </div>
                    <div className="weather-humidity-row flex flex-wrap justify-center mt-4 w-full max-w-[964px] mx-auto gap-4">
                        <p className="weather-humidity text-zinc-200 text-base" aria-label="Humidity">
                            Humidity: {weatherData.main.humidity}%
                        </p>
                        <p className="weather-wind text-zinc-200 text-base" aria-label="Wind">
                            Wind: {weatherData.wind.speed} km/h
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
