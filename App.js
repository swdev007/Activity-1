import {LogBox} from 'react-native';
import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {decode} from 'base-64';
import {Provider} from 'react-redux';
global.atob = decode;
import {ToastProvider} from 'react-native-toast-notifications';
import {store} from './src/Redux/Store';
import AppNavigation from './src/Stacks/AppNavigation';
LogBox.ignoreAllLogs();

const App = () => {
  SplashScreen.hide();
  return (
    <Provider store={store}>
      <ToastProvider>
        <AppNavigation />
      </ToastProvider>
    </Provider>
  );
};

export default App;
