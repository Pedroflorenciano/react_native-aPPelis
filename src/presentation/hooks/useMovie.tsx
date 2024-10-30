import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { FullMovie } from '../../core/entities/movies.entity';
import { Cast } from '../../core/entities/cast.entity';
import * as UseCases from '../../core/use-cases';

export const useMovie = (peliculaId: number) => {

    const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();


  useEffect(() => {
    loadMovie();    
  }, [peliculaId]);


  const loadMovie = async() => {
    setIsLoading(true);

    const fullMoviePromise = UseCases.getMovieByIdUseCase(movieDBFetcher, peliculaId);
    const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, peliculaId);
    
    const [ fullMovie, cast ] = await Promise.all([ fullMoviePromise, castPromise ]);

    setMovie(fullMovie);
    setCast( cast );

    setIsLoading(false);
    
  }
  
  return {
    isLoading,
    movie,
    cast,
  }
}
