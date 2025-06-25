import { useState } from 'react';
import type { ICityInfo, ICurrentWeather } from '../schemas';
import type { Coords } from '../types';

type SearchProps = {
    onSelect: (city: ICityInfo) => void;
};

export default function Search({ onSelect }: SearchProps) {
    const [searchValue, setSearchValue] = useState<string>('');

    async function getCityInfo(cityName: string): Promise<ICityInfo> {
        return {} as ICityInfo;
    }

    async function getWeatherInfo(coords: Coords): Promise<ICurrentWeather> {
        return {} as ICurrentWeather;
    }

    async function handleSubmitSearch() {
        const cityInfo: ICityInfo = await getCityInfo(searchValue);
        const coords: Coords = { lan: cityInfo.lat, lon: cityInfo.lon };
        const cityWeatherInfo: ICurrentWeather = await getWeatherInfo(coords);

        onSelect({ ...cityInfo, weather: cityWeatherInfo });
    }

    return (
        <div aria-labelledby="weather-search-label" className="weather-search-container w-full mb-8 relative">
            <form
                className="weather-search flex w-full justify-center"
                onSubmit={handleSubmitSearch}
                role="search"
                aria-label="Search for a city"
            >
                <input
                    id="weather-search-input"
                    className="weather-search-input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-zinc-100"
                    type="text"
                    placeholder="Search for a city..."
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <button
                    className="weather-search-button bg-blue-500 text-white ml-2 px-4 py-2 rounded-r hover:bg-blue-600"
                    type="submit"
                    aria-label="Search weather for entered city"
                >
                    Search
                </button>
            </form>
        </div>
    );
}
