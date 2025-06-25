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
            temp_min: z.number(),
            temp_max: z.number(),
            pressure: z.number(),
            humidity: z.number(),
            sea_level: z.number(),
            grnd_level: z.number(),
        }),
        visibility: z.number(),
        wind: z.object({
            speed: z.number(),
            deg: z.number(),
            gust: z.number(),
        }),
        rain: z.record(z.string(), z.number()).optional(),
        clouds: z.object({
            all: z.number(),
        }),
        dt: z.number(),
        sys: z.object({
            type: z.number(),
            id: z.number(),
            country: z.string(),
            sunrise: z.number(),
            sunset: z.number(),
        }),
        timezone: z.number(),
        id: z.number(),
        name: z.string(),
        cod: z.number(),
    })
    .describe('currentWeather');

export type ICurrentWeather = z.infer<typeof currentWeatherSchema>;

export const cityInfoSchema = z
    .object({
        datasource: z.object({
            sourcename: z.string(),
            attribution: z.string(),
            license: z.string(),
            url: z.string(),
        }),
        country: z.string(),
        country_code: z.string(),
        state: z.string(),
        county: z.string(),
        city: z.string(),
        iso3166_2: z.string(),
        lon: z.number(),
        lat: z.number(),
        state_code: z.string(),
        result_type: z.string(),
        formatted: z.string(),
        address_line1: z.string(),
        address_line2: z.string(),
        category: z.string(),
        timezone: z.object({
            name: z.string(),
            offset_STD: z.string(),
            offset_STD_seconds: z.number(),
            offset_DST: z.string(),
            offset_DST_seconds: z.number(),
            abbreviation_STD: z.string(),
            abbreviation_DST: z.string(),
        }),
        plus_code: z.string(),
        plus_code_short: z.string(),
        rank: z.object({
            importance: z.number(),
            popularity: z.number(),
            confidence: z.number(),
            confidence_city_level: z.number(),
            match_type: z.string(),
        }),
        place_id: z.string(),
        bbox: z.object({
            lon1: z.number(),
            lat1: z.number(),
            lon2: z.number(),
            lat2: z.number(),
        }),
        weather: currentWeatherSchema,
    })
    .describe('cityInfo');

export type ICityInfo = z.infer<typeof cityInfoSchema>;
