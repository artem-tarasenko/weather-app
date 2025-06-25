import type { ICurrentWeather } from '../schemas';

export const currentWeather: ICurrentWeather = {
    coord: {
        lon: 7.367,
        lat: 45.133,
    },
    weather: [
        {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
        },
    ],
    base: 'stations',
    main: {
        temp: 24.99,
        feels_like: 25.4,
        temp_min: 22.39,
        temp_max: 27.45,
        pressure: 1016,
        humidity: 71,
        sea_level: 1016,
        grnd_level: 908,
    },
    visibility: 10000,
    wind: {
        speed: 4.06,
        deg: 300,
        gust: 3.34,
    },
    clouds: {
        all: 23,
    },
    dt: 1750877844,
    sys: {
        type: 2,
        id: 2004011,
        country: 'IT',
        sunrise: 1750823062,
        sunset: 1750879310,
    },
    timezone: 7200,
    id: 3165523,
    name: 'Province of Turin',
    cod: 200,
};
