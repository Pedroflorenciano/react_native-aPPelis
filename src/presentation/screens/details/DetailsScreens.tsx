import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';

import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../components/movie/MovieHeader';
import { MovieDetails } from '../../components/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';
import { RootStackParams } from '../../navigations/AppNavigation';


interface Props extends StackScreenProps<RootStackParams, 'Details'>{};


export const DetailsScreens = ({ route }: Props) => {

  const { peliculaId } = route.params;
  // const { peliculaId } = useRoute().params;
  const { isLoading, movie, cast = [] } = useMovie( peliculaId );

  if (isLoading) {
    return <FullScreenLoader />
  }

  return (
    <ScrollView>
      
      {/* Header */}
      <MovieHeader 
        originalTitle={ movie!.originalTitle} 
        title={ movie!.title}
        poster={ movie!.poster }
      />


      {/* Details */}
      <MovieDetails movie={ movie! } cast={cast} />


    </ScrollView>
  )
}