import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {GetBinList} from '../../../../../Services/Auth/apiRoutes';
import axios from 'axios';
import BottomTab from '../../../../BottomTab/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {StoreInterface} from '../../../../../Redux/Store';
import {BinListStyle} from './BinList.style';
import {LoadingComponent} from '../../../../../Components/Modals/LoadingComponent/LoadingComponent';
import {RouteList} from '../../../../../Components/Headers/RouteList/RouteList';
import {CustomHeader} from '../../../../../Components/Headers/CustomHeader/CustomHeader';
const BinList = ({route, navigation}) => {
  const [collectiondata, setCollectionData] = useState();
  const [loading, setLoading] = useState(false);
  const [screens, setscreens] = useState([]);
  const isFocused = useIsFocused();
  const AppTheme = useSelector((store: StoreInterface) => store.theme.AppTheme);
  const styles = BinListStyle(AppTheme);
  useEffect(() => {
    const routes = navigation.getState()?.routes;
    setscreens(routes);
    if (isFocused) {
      GetCollectionListFunc();
    }
  }, [isFocused]);
  const GetCollectionListFunc = async () => {
    setLoading(true);
    let token = await AsyncStorage.getItem('LoginToken');
    axios
      .post(
        GetBinList,
        {
          collectionId: route?.params?.id,
        },
        {headers: {Authorization: 'Bearer ' + token}},
      )
      .then(function (response) {
        setCollectionData(response?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log('error of get Collection list =>', error);
        setLoading(false);
      });
  };
  const RenderCollectionData = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.collectionDataItem}
        onPress={() =>
          navigation.navigate('BinDetails', {
            id: item?.warrant_id,
            screenPath: item?.bin_name,
          })
        }>
        <View style={styles.collectionDataItemImageContainer}>
          <Image
            source={AppTheme.icons.lock}
            style={styles.collectionDataItemImage}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            marginStart: 16,
            width: Dimensions.get('window').width - 150,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.binName}>{item?.warrant_name}</Text>
          </View>

          <Text style={styles.locationContainer}>
            <Text style={styles.locationText}>Location :</Text>
            {item?.location}
          </Text>
        </View>

        <View style={styles.rightIconContainer}>
          <Image
            source={AppTheme.icons.rightIcon}
            style={styles.rightIcon}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <View style={styles.root}>
      <View>
        <CustomHeader
          type={'Home'}
          collection={'Warrant List'}
          onPress={() => navigation.navigate('Home')}
          backbtn={'backbtn'}
          onHandleBack={() => navigation.goBack()}
        />

        <RouteList data={screens} currentname={route.name} />
      </View>

      <View style={styles.collectionListUi}>
        <Text style={styles.title}>Warrant List</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={collectiondata}
          renderItem={(item: any) => RenderCollectionData(item)}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <BottomTab type={'home'} />
    </View>
  );
};

export default BinList;
