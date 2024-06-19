import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/PostLogin/HomeScreen';
import ViewCollection from '../screens/PostLogin/CollectionComponent/ViewCollection';
import EditCollection from '../screens/PostLogin/CollectionComponent/EditCollection';
import ViewCollectionList from '../screens/PostLogin/CollectionComponent/ViewCollectionList';
import ViewItem from '../screens/PostLogin/CollectionComponent/ViewItem';
import AddUpdate from '../screens/PostLogin/AddUpdate';
import ViewProfile from '../screens/PostLogin/ViewProfile';
import BinList from '../screens/PostLogin/BinComponent/BinList';
import BinDetails from '../screens/PostLogin/BinComponent/BinDetails';
import EditBin from '../screens/PostLogin/BinComponent/EditBin';
import AddNewItem from '../screens/PostLogin/BinComponent/AddItem';
import GetItemListOfBin from '../screens/PostLogin/BinComponent/GetItemListofBin';
import BinItemDetail from '../screens/PostLogin/BinComponent/BinItemDetail';
import UpdateDeleteBinItem from '../screens/PostLogin/BinComponent/UpdateDeleteBinItem';
import AddCollectionList from '../screens/PostLogin/CollectionComponent/AddCollectionList';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewCase" component={ViewCollection} />
      <Stack.Screen name="EditCollection" component={EditCollection} />
      <Stack.Screen name="ViewCaseList" component={ViewCollectionList} />
      <Stack.Screen name="AddCollectionList" component={AddCollectionList} />
      <Stack.Screen name="ViewEvidence" component={ViewItem} />
      <Stack.Screen name="AddUpdate" component={AddUpdate} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="WarrantList" component={BinList} />
      <Stack.Screen name="WarrantDetails" component={BinDetails} />
      <Stack.Screen name="EditWarrant" component={EditBin} />
      <Stack.Screen name="AddNewEvidence" component={AddNewItem} />
      <Stack.Screen name="GetEvidenceListOfWarrant" component={GetItemListOfBin} />
      <Stack.Screen name="WarrantEvidenceDetail" component={BinItemDetail} />
      <Stack.Screen
        name="UpdateDeleteWarrantEvidence"
        component={UpdateDeleteBinItem}
      />
    </Stack.Navigator>
  );
}
