import axios from 'axios';
import { z } from 'zod';

import type { SearchType } from '../types';

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
});

type Weather = z.infer<typeof Weather>

export default function useWeather() {
    
    const fetchWeather = async (search: SearchType) => {

        const appid = import.meta.env.VITE_API_KEY

        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`
            const {data} = await axios(geoURL);

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
            const {data: weatherResult} = await axios(weatherUrl);
            const result = Weather.safeParse(weatherResult);
            
            if (result.success) {
                console.log(result.data.name);
            }

        } catch (error) {
            console.error(error)
        }
    }
    
    return {
        fetchWeather
    }
}