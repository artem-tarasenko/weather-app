import { useEffect, useState, type FormEvent } from 'react';
import type { ICityInfo } from '../schemas';
import { useCityQuery } from '../queries/getCityInfo';
import { useWeatherQuery } from '../queries/getWeatherInfo';
import SearchError from './SearchError';
import Spinner from './Spinner';

type SearchProps = {
    onSelect: (city: ICityInfo) => void;
};

export default function Search({ onSelect }: SearchProps) {
    const [searchValue, setSearchValue] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltopMessage, setTooltopMessage] = useState<string | null>(null);
    // react queries, do accept null initially and will get the data once the local city has been set (search result)
    const cityQuery = useCityQuery(city);
    const weatherQuery = useWeatherQuery(cityQuery?.data ? { lat: cityQuery.data.lat, lon: cityQuery.data.lon } : null);

    // search button handler, set local state to trigger effect
    async function handleSubmitSearch(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        // Sanitize the input, mostly cut the emojis, search API consumes numbers and other chars without issue, it is part of a query
        // but let's still not test emojis
        const sanitizedValue = searchValue
            .trim()
            .replace(
                /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
                '',
            );
        // Validate input length for a maximum value
        if (sanitizedValue.length > 50) return showSearchMessage('City name is too long, please use a shorter name');
        // Validate input length for a minimum value
        if (sanitizedValue.length < 3) return showSearchMessage('City name is too short, type at least 3 chars');
        if (!isLoading) {
            setIsLoading(true);
        }
        setCity(sanitizedValue);
    }

    // function to set a content of a validation search tooltip and showing it
    function showSearchMessage(msg: string) {
        if (msg) {
            setTooltopMessage(msg);
        }
        setShowTooltip(true);
    }

    // effect to set parent (glogal) state when all the data is available
    useEffect(() => {
        // guardian, does nothing if any query has error
        if (cityQuery.isError || weatherQuery.isError) return;
        // if all data is available, make a state compatiable object and store it
        if (cityQuery.data && weatherQuery.data) {
            const cityInfo = cityQuery.data;
            const weather = weatherQuery.data;
            const city = { ...cityInfo, weather };
            onSelect(city);
            setSearchValue('');
            setIsLoading(false);
            setCity('');
        }
    }, [cityQuery.data, weatherQuery.data, cityQuery.isError, weatherQuery.isError]);

    // effect to remove a validation tooltip after a timeout
    useEffect(() => {
        if (!showTooltip) return;
        const timeout = setTimeout(() => {
            setShowTooltip(false);
            setTooltopMessage(null);
        }, 1750);

        return () => clearTimeout(timeout);
    }, [showTooltip]);

    return (
        <div aria-labelledby="weather-search-label" className="weather-search-container w-full mb-8 relative">
            <form
                className="weather-search flex flex-col w-full justify-center relative"
                onSubmit={handleSubmitSearch}
                role="search"
                aria-label="Search for a city"
            >
                <div className="flex justify-center">
                    <input
                        id="weather-search-input"
                        className="weather-search-input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-zinc-100"
                        type="text"
                        placeholder="Search for a city..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        disabled={isLoading}
                    />
                    <button
                        className="weather-search-button bg-blue-500 text-white ml-2 px-4 py-2 rounded hover:bg-blue-600 w-20 flex justify-center items-center"
                        type="submit"
                        aria-label="Search weather for entered city"
                    >
                        {isLoading ? <Spinner /> : 'Search'}
                    </button>
                </div>
                {showTooltip && tooltopMessage && (
                    <p className="flex justify-center text-xs text-red-700 bold mt-2 absolute -bottom-5 left-3 sm:left-36">
                        {tooltopMessage}
                    </p>
                )}
            </form>
            <SearchError hasError={cityQuery.isError || weatherQuery.isError} onReset={() => setCity('')} />
        </div>
    );
}
