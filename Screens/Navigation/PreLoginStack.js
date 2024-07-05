import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/PreLogin/SplashScreen';

import ForgetPasswordScreen from '../screens/PreLogin/ForgetPasswordScreen';
import ConfirmPasswordScreen from '../screens/PreLogin/ConfirmPasswordScreen';

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
