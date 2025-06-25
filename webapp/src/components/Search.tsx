type SearchProps = {};

export default function Search(props: SearchProps) {
    return (
        <div aria-labelledby="weather-search-label" className="weather-search-container w-full max-w-xs mb-8 relative">
            <form className="weather-search flex" onSubmit={() => null} role="search" aria-label="Search for a city">
                <input
                    id="weather-search-input"
                    className="weather-search-input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none text-zinc-100"
                    type="text"
                    placeholder="Search for a city..."
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
