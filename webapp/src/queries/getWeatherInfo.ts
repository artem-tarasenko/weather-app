import { ZodError } from 'zod/v4';
import { currentWeatherSchema, type ICurrentWeather } from '../schemas';
import axios from 'axios';
import { useQuery } from 'react-query';
import type { Coords } from '../types';

/**
 * Fetches weather data for a given city from the real API using env variables.
 * Falls back to mock data if env variables are missing.
 */
export async function fetchCurrentWeather(coords: Coords | null): Promise<ICurrentWeather | null> {
    //query is allowed to have no query param as a starting state
    if (!coords) return null;

    const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    if (!apiUrl || !apiKey) throw new Error('Weather API URL or key is missing');

    try {
        const url = `${apiUrl}/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${apiKey}`;
        const response = await axios.get(url, {
            headers: {
                Accept: 'application/json',
            },
        });

        // Validate and parse the response using ZOD
        const parsed = currentWeatherSchema.parse(response.data);
        return parsed;
    } catch (error) {
        // in case of changed API payload, test error for a ZOD error and pre-format it
        if (error instanceof ZodError) {
            // apparently in ZOD4 the method to format the error is not longer a go-to way, will leave it like that since working for now
            //todo update zod error formatting to v4 compatiable way
            throw new Error(`Invalid weather data received from API: ${error.format()}`);
        }
        // somewhere here usually goes Sentry reporting if ErrorBoundary has not been used
        throw error;
    }
}

// Custom React Query hook to fetch weather data for a city using the real API
export function useWeatherQuery(coords: Coords | null) {
    return useQuery<ICurrentWeather | null>({
        queryKey: ['weather', coords],
        queryFn: () => fetchCurrentWeather(coords),
    });
}
