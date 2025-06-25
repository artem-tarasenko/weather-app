import { ZodError } from 'zod/v4';
import { citySearchResponseSchema, type ICityResponseInfo } from '../schemas';
import axios from 'axios';
import { useQuery } from 'react-query';

export async function fetchCityInfo(city: string): Promise<ICityResponseInfo | null> {
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
        if (error instanceof ZodError) {
            throw new Error(`Invalid weather data received from API: ${error.format()}`);
        }
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
