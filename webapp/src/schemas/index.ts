import { z } from 'zod/v4';

export const currentWeatherSchema = z
    .object({
        coord: z.object({
            lon: z.number(),
            lat: z.number(),
        }),
        weather: z.array(
            z.object({
                id: z.number(),
                main: z.string(),
                description: z.string(),
                icon: z.string(),
            }),
        ),
        base: z.string(),
        main: z.object({
            temp: z.number(),
            feels_like: z.number(),
            pressure: z.number(),
            humidity: z.number(),
        }),
        visibility: z.number().optional(),
        wind: z.object({
            speed: z.number(),
            deg: z.number().optional(),
            gust: z.number().optional(),
        }),
        rain: z.record(z.string(), z.number()).optional(),
        clouds: z.object({
            all: z.number(),
        }),
        id: z.number(),
        name: z.string(),
    })
    .describe('currentWeather');

export type ICurrentWeather = z.infer<typeof currentWeatherSchema>;

export const cityInfoResponseSchema = z
    .object({
        country: z.string().optional(),
        country_code: z.string().optional(),
        state: z.string().optional(),
        county: z.string().optional(),
        city: z.string(),
        lon: z.number(),
        lat: z.number(),
        state_code: z.string().optional(),
        result_type: z.string(),
        formatted: z.string(),
        address_line1: z.string(),
        address_line2: z.string(),
        category: z.string().optional(),
        rank: z
            .object({
                importance: z.number().optional(),
                popularity: z.number().optional(),
                confidence: z.number().optional(),
                confidence_city_level: z.number().optional(),
                match_type: z.string().optional(),
            })
            .optional(),
        place_id: z.string(),
    })
    .describe('cityInfo');

export const cityInfoSchema = cityInfoResponseSchema.extend({ weather: currentWeatherSchema });
export const citySearchResponseSchema = z.object({
    query: z.object({
        text: z.string(),
        parsed: z
            .object({
                city: z.string().optional(),
                country: z.string().optional(),
                expected_type: z.string().optional(),
            })
            .optional(),
    }),
    results: z.array(cityInfoResponseSchema),
});

export type ICitySearchResponseInfo = z.infer<typeof citySearchResponseSchema>;
export type ICityResponseInfo = z.infer<typeof cityInfoResponseSchema>;
export type ICityInfo = z.infer<typeof cityInfoSchema>;
