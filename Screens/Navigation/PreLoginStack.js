import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../src/Stacks/Screens/Splash/SplashScreen';

import ForgetPasswordScreen from '../screens/PreLogin/ForgetPasswordScreen';
import ConfirmPasswordScreen from '../../src/Stacks/Screens/Splash/SplashScreen';

const Stack = createNativeStackNavigator();

export default function PreLoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
      />
      <Stack.Screen
        name="ConfirmPasswordScreen"
        component={ConfirmPasswordScreen}
      />
    </Stack.Navigator>
  );
}
