import React from 'react'
import { Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movies.entity'
import { ScrollView } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';

interface Props{
    movies: Movie[];
    height?: number;
}

export const PosterCarrusel = ({ height = 440, movies}: Props) => {
  return (
    <View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {movies.map(movie => <MoviePoster key={movie.id} movie={movie} />)}
        </ScrollView>
    </View>
  )
}
