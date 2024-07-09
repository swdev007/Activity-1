import * as React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeStack from './Home/Home.stack';
import PreLoginStack from './PreLogin/PreLogin.stack';

export type RootStackParamList = {
  Initial: undefined;
  Homes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureDirection: 'horizontal',
          animation: 'slide_from_right',
          gestureEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen
          name="Initial"
          component={PreLoginStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homes"
          component={HomeStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
