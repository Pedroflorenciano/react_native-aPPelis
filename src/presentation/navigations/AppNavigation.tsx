import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/login/Login';
import Registro from '../screens/login/Registro';
import { HomeScreens } from '../screens/home/HomeScreens';
import PerfilUsuario from '../screens/users/PerfilUsuario';
import { DetailsScreens } from '../screens/details/DetailsScreens';

export type RootStackParams = {
    Home: undefined;
    Login: undefined;
    Registro: undefined;
    Users: undefined;
    Details: { peliculaId: number };
};

const Stack = createStackNavigator<RootStackParams>();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Home" component={HomeScreens} />
        <Stack.Screen name="Users" component={PerfilUsuario} />
        <Stack.Screen name="Details" component={DetailsScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
