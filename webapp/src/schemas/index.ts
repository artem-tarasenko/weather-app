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
