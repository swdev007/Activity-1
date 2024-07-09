import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './Screens/Splash/SplashScreen';
import ForgetPasswordScreen from './Screens/ForgotPassword/ForgetPasswordScreen';
import ConfirmPasswordScreen from './Screens/ConfirmPassword/ConfirmPasswordScreen';

export type PreLoginStackParamList = {
  SplashScreen: undefined;
  ForgetPasswordScreen: undefined;
  ConfirmPasswordScreen: undefined;
};

const Stack = createNativeStackNavigator<PreLoginStackParamList>();

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
