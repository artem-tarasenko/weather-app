import { useState } from 'react';

type SearchProps = {
    onSelect: (city: string) => void;
};

export default function Search({ onSelect }: SearchProps) {
    const [searchValue, setSearchValue] = useState<string>('');

    function handleSubmitSearch() {
        onSelect(searchValue);
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
