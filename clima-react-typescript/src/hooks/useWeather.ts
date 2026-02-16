import axios from 'axios';
import { z } from 'zod';

import type { SearchType } from '../types';
import { useMemo, useState } from 'react';

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
});

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export type Weather = z.infer<typeof Weather>

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialState);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async (search: SearchType) => {

        const appid = import.meta.env.VITE_API_KEY

        setLoading(true);
        setWeather(initialState);

        try {
            const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`
            const { data } = await axios(geoURL);

            // Comprobamos si existe
            if (!data[0]) {
                setNotFound(true);
                return;
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
            const { data: weatherResult } = await axios(weatherUrl);
            const result = Weather.safeParse(weatherResult);

            if (result.success) {
                setWeather(result.data);
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}