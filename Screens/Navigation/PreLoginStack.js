import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialSplash from '../screens/PreLogin/InitialSplash';
import SplashScreen from '../screens/PreLogin/SplashScreen';
import LoginScreen from '../screens/PreLogin/LoginScreen';

const Stack = createNativeStackNavigator();

export default function PreLoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="InitialSplash" component={InitialSplash} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}
