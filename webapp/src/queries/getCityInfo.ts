import { ZodError } from 'zod/v4';
import { citySearchResponseSchema, type ICityResponseInfo } from '../schemas';
import axios from 'axios';
import { useQuery } from 'react-query';

export async function fetchCityInfo(city: string): Promise<ICityResponseInfo | null> {
    //query is allowed to have no query param as a starting state
    if (city.length === 0) return null;

    const apiUrl = import.meta.env.VITE_GEO_API_URL;
    const apiKey = import.meta.env.VITE_GEO_API_KEY;

    if (!apiUrl || !apiKey) throw new Error('Geo API URL or key is missing');

    try {
        const url = `${apiUrl}/geocode/search?text=${encodeURIComponent(city)}&format=json&apiKey=${apiKey}`;

        const response = await axios.get(url, {
            headers: {
                Accept: 'application/json',
            },
        });
        // Validate and parse the response using ZOD
        const parsed = citySearchResponseSchema.parse(response.data);
        return parsed.results[0];
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
export function useCityQuery(city: string) {
    return useQuery<ICityResponseInfo | null>({
        queryKey: ['city', city],
        queryFn: () => fetchCityInfo(city),
    });
}
