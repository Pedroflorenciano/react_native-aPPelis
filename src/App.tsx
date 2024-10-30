import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { Navigation } from './presentation/navigations/Navigation';
import { NavigationLogin } from './presentation/navigations/NavigationLogin';

export const App = () => {
  return (
    <NavigationContainer>
      <NavigationLogin />
    </NavigationContainer>
  )
}
