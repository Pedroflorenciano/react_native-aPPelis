import React, { useEffect, useRef } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movies.entity'
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';

interface Props {
    movies: Movie[];
    title?: string;
    longNextPage?: () => void;
}

export const HorizontalCarrusel = ({ movies, title, longNextPage }: Props) => {

    const isLoading = useRef(false)

    useEffect( () => {
        setTimeout(() => {
            isLoading.current=false
        }, 200);
    }, [movies])

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if(isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;
        if(!isEndReached)return;

        isLoading.current = true;

        longNextPage && longNextPage();

    }


    return (
        <View
            style={{ height: title ? 260 : 220 }}
        >
            {title && (
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: '300',
                        marginLeft: 10,
                        marginBottom: 10,
                        color: '#e30613'
                    }}
                >{title}</Text>
            )}
            <FlatList 
                data={movies}
                renderItem={({item}) => (
                    <MoviePoster movie={item} width={140} height={200} />
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => onScroll(event)}
            />
        </View>
    )
}
