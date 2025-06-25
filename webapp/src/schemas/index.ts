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
            temp_min: z.number().optional(),
            temp_max: z.number().optional(),
            pressure: z.number(),
            humidity: z.number(),
            sea_level: z.number().optional(),
            grnd_level: z.number().optional(),
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
        dt: z.number(),
        sys: z
            .object({
                type: z.number(),
                id: z.number(),
                country: z.string().optional(),
                sunrise: z.number().optional(),
                sunset: z.number().optional(),
            })
            .optional(),
        timezone: z.number().optional(),
        id: z.number(),
        name: z.string(),
        cod: z.number().optional(),
    })
    .describe('currentWeather');

export type ICurrentWeather = z.infer<typeof currentWeatherSchema>;

export const cityInfoResponseSchema = z
    .object({
        datasource: z
            .object({
                sourcename: z.string(),
                attribution: z.string(),
                license: z.string(),
                url: z.string(),
            })
            .optional(),
        country: z.string().optional(),
        country_code: z.string().optional(),
        state: z.string().optional(),
        county: z.string().optional(),
        city: z.string(),
        iso3166_2: z.string().optional(),
        lon: z.number(),
        lat: z.number(),
        state_code: z.string().optional(),
        result_type: z.string(),
        formatted: z.string(),
        address_line1: z.string(),
        address_line2: z.string(),
        category: z.string().optional(),
        timezone: z
            .object({
                name: z.string(),
                offset_STD: z.string(),
                offset_STD_seconds: z.number(),
                offset_DST: z.string(),
                offset_DST_seconds: z.number(),
                abbreviation_STD: z.string(),
                abbreviation_DST: z.string(),
            })
            .optional(),
        plus_code: z.string().optional(),
        plus_code_short: z.string().optional(),
        rank: z
            .object({
                importance: z.number(),
                popularity: z.number(),
                confidence: z.number(),
                confidence_city_level: z.number(),
                match_type: z.string(),
            })
            .optional(),
        place_id: z.string(),
        bbox: z
            .object({
                lon1: z.number(),
                lat1: z.number(),
                lon2: z.number(),
                lat2: z.number(),
            })
            .optional(),
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
