import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreens } from '../screens/home/HomeScreens';
import { DetailsScreens } from '../screens/details/DetailsScreens';

export type RootStackParams = {
    Home: undefined;
    Details: { peliculaId: number}
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreens} />
      <Stack.Screen name="Details" component={DetailsScreens} />
    </Stack.Navigator>
  );
}