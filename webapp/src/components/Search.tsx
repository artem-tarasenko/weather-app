import { useEffect, useState, type FormEvent } from 'react';
import type { ICityInfo } from '../schemas';
import { useCityQuery } from '../queries/getCityInfo';
import { useWeatherQuery } from '../queries/getWeatherInfo';

type SearchProps = {
    onSelect: (city: ICityInfo) => void;
};

export default function Search({ onSelect }: SearchProps) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [city, setCity] = useState('');
    // react queries, do accept null initially and will get the data once the local city has been set (search result)
    const cityQuery = useCityQuery(city);
    const weatherQuery = useWeatherQuery(cityQuery?.data ? { lat: cityQuery.data.lat, lon: cityQuery.data.lon } : null);
    // search button handler, set local state to trigger effect
    async function handleSubmitSearch(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setCity(searchValue);
    }

    // effect to set parent (glogal) state when all the data is available
    useEffect(() => {
        if (cityQuery.data && weatherQuery.data) {
            const cityInfo = cityQuery.data;
            const weather = weatherQuery.data;
            const city = { ...cityInfo, weather };
            onSelect(city);
            //todo do not reset in case of a failed api requests
            setSearchValue('');
        }
    }, [cityQuery.data, weatherQuery.data]);

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
