import { Plus } from 'lucide-react';
import type { ICityInfo } from '../schemas';

type WeatherInfoProps = {
    currentCity: ICityInfo | null;
    onSaveCity: () => void;
    isCitySaved: boolean;
};

export default function WeatherInfo({ currentCity, onSaveCity, isCitySaved }: WeatherInfoProps) {
    return (
        <section className="weather-main-card flex justify-center flex-col bg-white/20 rounded shadow p-6 w-full text-center relative">
            {currentCity ? (
                <>
                    <div className="weather-location-row flex justify-center items-center">
                        <h2 className="weather-location text-white sm:text-xl font-semibold grow">
                            {currentCity.formatted}
                        </h2>
                        <button
                            className="p-1 ml-2 bg-green-600 hover:bg-green-500/70 disabled:bg-green-600/20 duration-100 ease-in-out rounded w-6 h-6 text-sm font-bold"
                            onClick={onSaveCity}
                            disabled={isCitySaved}
                        >
                            <Plus size={16} className="font-bold" />
                        </button>
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
                </>
            ) : (
                <p className="italic my-6">Please search a city of select one from saved list...</p>
            )}
        </section>
    );
}
