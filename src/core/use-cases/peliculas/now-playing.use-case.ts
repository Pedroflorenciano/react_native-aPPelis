import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { NowPlayingResponses } from "../../../infrastructure/interfaces/movies-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movies.entity";

export const peliculasNowPlayingUseCase = async ( fetcher: HttpAdapter ):Promise<Movie[]> =>{

    try {
        const nowPlaying = await fetcher.get<NowPlayingResponses>('/now_playing');

        return nowPlaying.results.map( MovieMapper.fromMovieDBResultToEntity )

    } catch (error) {
        console.log(error);
        throw new Error(`Error fetching movies - NowPlaying`)
    }
}