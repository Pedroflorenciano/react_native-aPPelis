import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/login/Login';
import { Navigation } from './Navigation';

export type RootStackParamsL = {
    Login: undefined;
    Home: undefined;
}

const Stack = createStackNavigator<RootStackParamsL>();

export const NavigationLogin = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Navigation} />
    </Stack.Navigator>
  );
}