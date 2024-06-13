import {LogBox} from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyStack from './Screens/Navigation/StackNavigation';
import PreLoginStack from './Screens/Navigation/PreLoginStack';
import SplashScreen from 'react-native-splash-screen';
import {decode} from 'base-64';
global.atob = decode;
import {ToastProvider} from 'react-native-toast-notifications';

LogBox.ignoreAllLogs();

const MainStack = createNativeStackNavigator();
const App = () => {
  SplashScreen.hide();
  return (
    <ToastProvider>
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
            gestureEnabled: false,
            headerShown: false,
          }}>
          <MainStack.Screen
            name="Initial"
            component={PreLoginStack}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Homes"
            component={MyStack}
            options={{headerShown: false}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
