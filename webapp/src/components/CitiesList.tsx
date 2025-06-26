import { X } from 'lucide-react';
import type { ICityInfo } from '../schemas';
import { isWideScreen } from '../utils';

type CitiesListProps = {
    cities: ICityInfo[];
    onRemoveCity: (cityId: string) => void;
    onClickCity: (city: ICityInfo) => void;
};

export default function CitiesList({ cities, onRemoveCity, onClickCity }: CitiesListProps) {
    function getFormattedCityName(cityName: string) {
        const isNameLengthy = cityName.length > 28;
        const shouldTrim = !isWideScreen() && isNameLengthy;
        return shouldTrim ? `${cityName.slice(0, 22)}...` : cityName;
    }

    return (
        <section className="weather-main-card flex justify-center flex-col bg-white/20 rounded shadow p-6 w-full text-center mb-4">
            <ul>
                {cities.length > 0 ? (
                    cities.map((city, index) => (
                        <li
                            key={index}
                            className="bg-white/20 hover:bg-white/30 duration-100 ease-in-out my-2 pl-4 pr-2 py-1 rounded flex cursor-pointer"
                            onClick={() => onClickCity(city)}
                        >
                            <p className="justify-between items-center flex grow mr-2">
                                {getFormattedCityName(city.formatted)}
                                <span className="hidden sm:block">{city.weather.main.temp}&deg; C</span>
                            </p>
                            <button
                                className="py-1 px-2 ml-2 text-sm bg-red-400 hover:bg-red-500 ease-in-out duration-200 rounded"
                                onClick={() => onRemoveCity(city.place_id)}
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
    );
}
