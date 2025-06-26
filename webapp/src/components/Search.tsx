import { useEffect, useState, type FormEvent } from 'react';
import debounce from 'lodash/debounce';

import type { ICityInfo, ICityResponseInfo } from '../schemas';
import { fetchCitiesSuggestions, useCityQuery } from '../queries/getCityInfo';
import { useWeatherQuery } from '../queries/getWeatherInfo';
import SearchError from './SearchError';
import { sanitizeString } from '../utils';
import Spinner from './Spinner';

type SearchProps = {
    onSelect: (city: ICityInfo) => void;
};

export default function Search({ onSelect }: SearchProps) {
    // controlled state of an input
    const [searchValue, setSearchValue] = useState<string>('');
    const [acceptedSearchValue, setAcceptedSearchValue] = useState<string>('');
    // this is a refined city selected by a user, will be used to queries
    const [city, setCity] = useState<ICityResponseInfo | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    // input validation and messaging tooltip state
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltopMessage, setTooltopMessage] = useState<string | null>('some new message here');
    // react queries, do accept null initially and will get the data once the local city has been set (search result)
    const cityQuery = useCityQuery(acceptedSearchValue);
    // conditionally pick what city will be used for fetching weather info, waiting for at least 1 source of coords is set
    const weatherFetchCoords = (() => {
        if (city) return { lat: city.lat, lon: city.lon };
        if (acceptedSearchValue && cityQuery.data) return { lat: cityQuery.data.lat, lon: cityQuery.data.lon };
        return null;
    })();
    const weatherQuery = useWeatherQuery(weatherFetchCoords);
    // suggestion related states
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const [suggestions, setSuggestions] = useState<Array<ICityResponseInfo>>([]);
    const [error, setError] = useState<string | null>(null);

    // search button handler, set local state to trigger effect
    async function handleSubmitSearch(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        // Sanitize the input, mostly cut the emojis, search API consumes numbers and other chars without issue, it is part of a query
        const sanitizedValue = sanitizeString(searchValue);
        // Validate input length for a maximum value
        if (sanitizedValue.length > 50) return showSearchMessage('City name is too long, please use a shorter name');
        // Validate input length for a minimum value
        if (sanitizedValue.length < 3) return showSearchMessage('City name is too short, type at least 3 chars');
        setAcceptedSearchValue(sanitizedValue);
    }

    // function to set a content of a validation search tooltip and showing it
    function showSearchMessage(msg: string) {
        setTooltopMessage(msg);
        setShowTooltip(true);
    }

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchValue(e.target.value);
        if (e.target.value.length > 0) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
            setSuggestions([]);
        }
        // reset suggestion selection if input change
        setHighlightedIndex(-1);
    }

    // handler to select a suggested city from a list
    function handleSuggestionSelect(suggestion: ICityResponseInfo): void {
        setCity(suggestion);
        setShowSuggestions(false);
        setSearchValue('');
    }

    // conveniece handler to perform suggestion list navigation, if there is a list visible
    // basically catching input keys to control suggestion list highlighting
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
        //guarding to do nothing if there is no suggestions shown
        if (!showSuggestions || !suggestions.length) return;

        if (e.key === 'Escape') return setShowSuggestions(false);
        if (e.key === 'ArrowDown') return setHighlightedIndex((i) => (i + 1) % suggestions.length);
        if (e.key === 'ArrowUp') return setHighlightedIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        if (e.key === 'Enter' && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            handleSuggestionSelect(suggestions[highlightedIndex]);
            e.preventDefault();
        }
    }

    // on blur, hide the suggestions list with a little delay
    function handleInputBlur(): void {
        setTimeout(() => setShowSuggestions(false), 200);
        setHighlightedIndex(-1);
    }

    //show suggestion list if there was any value left unfinished before bluring
    function handleInputFocus(): void {
        if (searchValue) setShowSuggestions(true);
    }

    // local wrapper for a fetchCitiesSearchList() with state related additions
    async function searchCities(input: string): Promise<void> {
        if (input.length === 0) {
            setSuggestions([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const results = await fetchCitiesSuggestions(input);
            setSuggestions(results ?? []);
        } catch (err: unknown) {
            //todo review, either handle or remove catch
            console.error(err);
            setError('Failed to fetch suggestions');
        } finally {
            setIsLoading(false);
        }
    }

    //add a delay before firing seatch function
    const debouncedSearchCities = debounce(searchCities, 500);

    //effect to fetch search results whenever input changes
    useEffect(() => {
        if (searchValue.length < 3) return;
        debouncedSearchCities(searchValue);
        // Cancel debounce on unmount
        return () => {
            debouncedSearchCities.cancel();
        };
    }, [searchValue]);

    // effect to set parent (glogal) state when all the data is available
    useEffect(() => {
        // guardian, does nothing if any query has error
        if (cityQuery.isError || weatherQuery.isError) return;
        // if all data is available, make a state compatiable object and store it
        if (weatherQuery.data) {
            const selectedCity = city ?? cityQuery.data;
            if (!selectedCity) throw new Error('Search.effect - selectedCity is undefined'); // some edge case

            const weather = weatherQuery.data;
            const cityWithWeather: ICityInfo = { ...selectedCity, weather };

            onSelect(cityWithWeather);
            setSearchValue('');
            setCity(null);
        }
        //reset states if the city request was successful but no search results
        if (cityQuery.isSuccess && !cityQuery.data && searchValue.length > 0) {
            console.log('cityQuery.isSuccess', cityQuery.isSuccess);
            showSearchMessage('Cannot find this city');
            setSearchValue('');
            setCity(null);
        }
    }, [
        cityQuery.data,
        cityQuery.isSuccess,
        cityQuery.isError,
        weatherQuery.data,
        weatherQuery.isSuccess,
        weatherQuery.isError,
        onSelect,
    ]);

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
                        className="weather-search-input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-zinc-100 w-full"
                        type="text"
                        placeholder="Search for a city..."
                        value={searchValue}
                        onChange={handleSearchInput}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                    />
                    {isLoading && (
                        <span className="absolute right-3 top-3">
                            <Spinner />
                        </span>
                    )}
                </div>
                {showTooltip && tooltopMessage && (
                    <p className="flex justify-center text-xs text-red-700 bold mt-2 absolute -top-8 left-0">
                        {tooltopMessage}
                    </p>
                )}
            </form>
            {showSuggestions && (
                <div className="absolute z-60 left-0 right-0">
                    <ul
                        id="city-suggestions"
                        className="weather-suggestions relative bg-white text-black rounded-xl shadow mt-1 max-h-60 overflow-auto"
                        role="listbox"
                    >
                        {error && <li className="px-4 py-2 text-red-400">{error}</li>}
                        {!isLoading && !error && suggestions.length === 0 && <li className="px-4 py-2">No results</li>}
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion.place_id}
                                id={`city-suggestion-${index}`}
                                role="option"
                                aria-selected={highlightedIndex === index}
                                className={`weather-suggestion px-4 py-2 text-xs cursor-pointer ${
                                    highlightedIndex === index ? 'bg-slate-600 text-white' : ''
                                }`}
                                onMouseDown={() => handleSuggestionSelect(suggestion)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {suggestion.formatted}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <SearchError hasError={cityQuery.isError || weatherQuery.isError} onReset={() => setCity(null)} />
        </div>
    );
}
