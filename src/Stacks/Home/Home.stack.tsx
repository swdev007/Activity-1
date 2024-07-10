import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ViewCollection from './Screens/ViewCollection/ViewCollection';
import ViewCollectionList from './Screens/ViewCollectionList/ViewCollectionList';
import AddCollectionList from './Screens/AddCollectionList/AddCollectionList';
import ViewItem from './Screens/ViewItem/ViewItem';
import AddUpdate from './Screens/AddUpdate/AddUpdate';
import ViewProfile from './Screens/Profile/ViewProfile';
import BinList from './Screens/Bin/BinList/BinList';
import BinDetails from './Screens/Bin/BinDetails/BinDetails';
import AddItem from './Screens/Bin/AddItem/AddItem';
import GetItemListOfBin from './Screens/Bin/GetItemListOfBin/GetItemListOfBin';
import BinItemDetail from './Screens/Bin/BinItemDetail/BinItemDetail';
import UpdateDeleteBinItem from './Screens/Bin/UpdateDeleteBinItem/UpdateDeleteBinItem';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewCollection" component={ViewCollection} />
      <Stack.Screen name="ViewCollectionList" component={ViewCollectionList} />
      <Stack.Screen name="AddCollectionList" component={AddCollectionList} />
      <Stack.Screen name="ViewItem" component={ViewItem} />
      <Stack.Screen name="AddUpdate" component={AddUpdate} />
      {/*  */}
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="BinList" component={BinList} />
      <Stack.Screen name="BinDetails" component={BinDetails} />
      <Stack.Screen name="AddNewItem" component={AddItem} />
      <Stack.Screen name="GetItemListOfBin" component={GetItemListOfBin} />
      <Stack.Screen name="BinItemDetail" component={BinItemDetail} />
      <Stack.Screen
        name="UpdateDeleteBinItem"
        component={UpdateDeleteBinItem}
      />
    </Stack.Navigator>
  );
}
