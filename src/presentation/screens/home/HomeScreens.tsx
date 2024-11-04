import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useMovies } from '../../hooks/useMovies'
import { ScrollView } from 'react-native-gesture-handler';
import { PosterCarrusel } from '../../components/movies/PosterCarrusel';
import { HorizontalCarrusel } from '../../components/movies/HorizontalCarrusel';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigations/AppNavigation';

export const HomeScreens = () => {
  const { isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage } = useMovies();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  if (isLoading) {
    return (<Text>Cargando...</Text>)
  }
  return (
    <ScrollView style={Style.header}>
      <View style={Style.headerContainer}>
      <Pressable onPress={()=> navigation.navigate('Users')} style={Style.iconButton}>
        <Icon name="user" size={30} color="white" />
      </Pressable>
      <Image source={require('../../../assets/LogoText2.png')} style={Style.image} />
    </View>
    
      <View >
        <PosterCarrusel movies={nowPlaying} />
        <View style={{ flex: 1, backgroundColor: 'white'}}>
          <HorizontalCarrusel movies={popular} title='Populares' longNextPage={popularNextPage} />
          <HorizontalCarrusel movies={topRated} title='Mejor calificadas' />
          <HorizontalCarrusel movies={upcoming} title='Proximamente' />
        </View>
      </View>
    </ScrollView>
  )
}

const Style = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#e30613',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -10
  },
  iconButton: {
    position: 'absolute',
    left: 15,
  },
  image: {
    resizeMode: 'contain',
    width: 150,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white'
  }
})