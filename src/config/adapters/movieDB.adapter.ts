import { AxiosAdapter } from "./http/axios.adapter";


export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params:{
        api_key: 'dacb908dc1f5432aea441526b7a5f229',
        language: 'es'
    }
})