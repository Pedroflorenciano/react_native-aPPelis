import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler';
import { PosterCarrusel } from '../../components/movies/PosterCarrusel';
import { HorizontalCarrusel } from '../../components/movies/HorizontalCarrusel';

export const HomeScreens = () => {
  const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();

  if (isLoading) {
    return (<Text>Cargando...</Text>)
  }
  return (
    <ScrollView style={Style.header}>
      <View style={Style.content}>
        <Image source={require('../../../assets/LogoText2.png')} style={Style.image} />
      </View>
      <View style={{ marginTop: 20, paddingBottom: 20 }}>
        <PosterCarrusel movies={nowPlaying} />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <HorizontalCarrusel movies={popular} title='Populares' longNextPage={popularNextPage} />
          <HorizontalCarrusel movies={topRated} title='Mejor calificadas' />
          <HorizontalCarrusel movies={upcoming} title='Proximamente' />
        </View>
      </View>
      <View style={Style.footer}>
      </View>
    </ScrollView>
  )
}

const Style = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#e30613',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: -20,
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 150,
    margin: -20
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
})